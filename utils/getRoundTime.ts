export const getRoundTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(Math.round(now.getMinutes() / 15) * 15);
    return now;
};
