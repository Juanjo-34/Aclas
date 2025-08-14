document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const message = document.getElementById('message');


    form.addEventListener('submit', function(e) {
        e.preventDefault();
       
        if (!validateForm()) {
            return;
        }


        const formData = new FormData(form);
       
        // Mostrar indicador de carga
        showLoadingIndicator();


        fetch('conexion.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Ocultar indicador de carga
            hideLoadingIndicator();


            if (data.includes('exitoso')) {
                showNotification('Registro exitoso', 'El beneficiario ha sido registrado correctamente.');
                form.reset();
            } else {
                showNotification('Error en el registro', data, true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            hideLoadingIndicator();
            showNotification('Error', 'Ocurrió un error. Por favor, intenta de nuevo.', true);
        });
    });


    function validateForm() {
        const inputs = form.querySelectorAll('input, select');
        let isValid = true;


        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showInputError(input, 'Este campo es requerido');
            } else {
                hideInputError(input);
            }
        });


        return isValid;
    }


    function showInputError(input, errorMessage) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');


        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }


        errorElement.textContent = errorMessage;
        input.classList.add('error');
    }


    function hideInputError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');


        if (errorElement) {
            errorElement.remove();
        }


        input.classList.remove('error');
    }


    function showLoadingIndicator() {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    }


    function hideLoadingIndicator() {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-user-plus"></i> Registrar';
    }


    function showNotification(title, message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : ''};
        notification.innerHTML = 
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        document.body.appendChild(notification);


        // Trigger reflow
        notification.offsetHeight;


        notification.classList.add('show');


        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
});