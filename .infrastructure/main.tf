# Important! This setup depends on the following Terraform setup to have been applied!
# https://github.com/Devops-2022-Group-R/itu-minitwit
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.65"
    }
  }

  # Terraform state is managed in Azure - create a storage container to use.
  backend "azurerm" {
    resource_group_name  = "core-rg"
    storage_account_name = "minitwitterraformstate"
    container_name       = "terraformstate"
    key                  = "terraform-frontend.tfstate"
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-rg"
  location = "northeurope"
}

resource "azurerm_app_service_plan" "frontend_asp" {
  name                = "${var.prefix}-asp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "frontend_as" {
  name                = "${var.prefix}-as"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.frontend_asp.id
  https_only          = true

  site_config {
    app_command_line = ""
    linux_fx_version = "DOCKER|kongborup/itu-minitwit-frontend:latest"
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"          = "https://registry.hub.docker.com"
    "DOCKER_ENABLE_CI"                    = "true"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "frontend_custom_domain" {
  hostname            = "rhododevdron.swuwu.dk"
  app_service_name    = azurerm_app_service.frontend_as.name
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_app_service_managed_certificate" "frontend_managed_certificate" {
  custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.frontend_custom_domain.id
}

resource "azurerm_app_service_certificate_binding" "frontend_certificate_binding" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.frontend_custom_domain.id
  certificate_id      = azurerm_app_service_managed_certificate.frontend_managed_certificate.id
  ssl_state           = "SniEnabled"
}
