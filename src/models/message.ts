export default interface Message {
    Author: {
        Username: string,
        Email: string,
    },
    PubDate: number,
    Text: string,
}