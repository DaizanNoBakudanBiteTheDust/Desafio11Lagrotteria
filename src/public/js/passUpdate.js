const form = document.getElementById('resetForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const token = document.getElementById("token").value;

  const url = `/api/sessions/resetPassword/${token}`;
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      body: data
    });

    if (response.ok) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      // Manejar los errores de forma más específica
      if (response.status === 400) {
      Swal.fire({
        title: "Error",
        text: "Error al enviar el correo de recuperación",
        icon: "error",
      });
      } else {
      Swal.fire({
        title: "Error",
        text: "Error al enviar el correo de recuperación",
        icon: "error",
      });
      }
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
});