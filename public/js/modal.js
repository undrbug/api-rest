const btnSend = document.getElementById('btn-send');
console.log(btnSend);
btnSend.addEventListener('click', async () => {
    const modal = document.getElementsByClassName('modal')[0];
    
    // modal.style.display = 'block';
    modal.showModal();
    //que muestre el modal por 2 segundos
    setTimeout(() => {
        // modal.style.display = 'none';
        modal.close();
    }, 3000);

    
});
