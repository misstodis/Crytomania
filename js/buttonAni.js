export function NavLoginbuttonAnimation() {
  // animation loggin button
  const loginBtn = document.querySelector("#nav-login-button");

  loginBtn.onmouseover = () => {
    loginBtn.classList.add("animate__animated", "animate__pulse");
  };

  loginBtn.onmouseout = () => {
    loginBtn.classList.remove("animate__animated", "animate__pulse");
  };
}
