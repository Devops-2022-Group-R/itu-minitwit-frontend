import md5 from 'md5';

// Set title of the page
export const setTitle = (title: string) => {
    document.title = `${title} | MiniTwit`;
}

export const getGravatarUrl = (email: string, size: number) => {
    const hash = md5(email.trim().toLowerCase());
    return `http://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
};

export const formatDateTime = (date: number): string => {
    const d = new Date(date);

    // Why?
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} @ ${d.getHours()}:${d.getMinutes()}`;
}