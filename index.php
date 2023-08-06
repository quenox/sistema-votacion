<!DOCTYPE html>
<html lang="es">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>


<body>
    <div class="container pt-3 pb-4 bg-light my-5 border" id="mi-contenedor">
        
        <div class="row justify-content-center">
            <div class="col-lg-6 text-uppercase">
                <h2 style="color: #a4cc42;">Formulario de votación</h2>
            </div>
        </div>
        <hr>
        <div class="row justify-content-center">
            <div class="col-lg-6">

            
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre y apellido <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre y apellido" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="alias" class="form-label">Alias <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="alias" name="alias" placeholder="Ingresa tu alias">
                    </div>
                    
                    <div class="mb-3">
                        <label for="rut" class="form-label">RUT <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="rut" name="rut" pattern="[0-9]{7,8}-[0-9Kk]{1}" placeholder="Ej: 12345678-9" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Ingresa tu email" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="region" class="form-label">Región</label>
                        <select class="form-select" id="region" name="region">
                            <!-- contenido cargado dinámicamente con jquery -->
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label for="comuna" class="form-label">Comuna</label>
                        <select class="form-select" id="comuna" name="comuna">
                            <!-- contenido cargado dinámicamente con jquery -->
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label for="candidato" class="form-label">Candidato</label>
                        <select class="form-select" id="candidato" name="candidato">
                            <!-- contenido cargado dinámicamente con jquery -->
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">¿Cómo se enteró de nosotros? <span class="text-danger">*</span> <small class="text-primary">(seleccione min. 2 valores)</small></label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="web" value="Web">
                            <label class="form-check-label" for="web">Web</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="tv" value="TV">
                            <label class="form-check-label" for="tv">TV</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="redes" value="Redes sociales">
                            <label class="form-check-label" for="redes">Redes sociales</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="amigo" value="Amigo">
                            <label class="form-check-label" for="amigo">Amigo</label>
                        </div>
                    </div>
                    
                    <button id="btn-votar" type="submit" class="btn btn-primary w-100 mt-2">Enviar</button>


            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="votar.js"></script>

</body>
</html>
