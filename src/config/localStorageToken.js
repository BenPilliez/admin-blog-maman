export const localStorageTokenConfig = () => {
    // On maintient la connexion pendant 24h
    let hours = 24 // Reset when storage is more than 24hours
    let now = new Date().getTime()
    let setupTime = localStorage.getItem('setupTime')
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now)
        }
    }
}
