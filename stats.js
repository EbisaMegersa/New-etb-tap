document.addEventListener('DOMContentLoaded', () => {
    const totalUsers = localStorage.getItem('total_users') || 0;
    const totalEtbTapped = localStorage.getItem('total_etb_tapped') || 0.0000;

    document.getElementById('total-users').innerText = totalUsers;
    document.getElementById('total-etb-tapped').innerText = parseFloat(totalEtbTapped).toFixed(4);
});