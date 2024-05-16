
export const convertDate = (date) =>{
    const newDate = new Date(date)
    const month = newDate.toLocaleString("default",{
        month:"short"
    });

    const day = newDate.getDate();
    const year = newDate.getFullYear()

    const formatedDate = `${month} ${day}, ${year}`
    return formatedDate
}
