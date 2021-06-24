export default function logOut() {
  const modalContainer = document.querySelector('#logoutModal');
  modalContainer.innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to log out?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" id="logoutModalButton">Log out</button>
                    <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>`;
  const logoutButton = document.querySelector('#logoutModalButton');
  logoutButton.addEventListener('click', function () {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    modalContainer.innerHTML = '';
    location.href = '/index.html';
  });
}
