# README.md

## ¿Qué es React Native?

React Native es un framework de código abierto creado por [Meta](https://reactnative.dev/?utm_source=chatgpt.com) que permite desarrollar aplicaciones móviles para Android e iOS utilizando JavaScript y React.

Con React Native se puede escribir una sola base de código y reutilizar gran parte del proyecto en ambas plataformas, reduciendo tiempo de desarrollo y mantenimiento.

### Características principales

* Desarrollo multiplataforma.
* Uso de componentes reutilizables.
* Hot Reload para visualizar cambios en tiempo real.
* Gran comunidad y soporte.
* Integración con APIs y librerías nativas.

---

## Buenas prácticas en React Native

### 1. Mantener una estructura organizada

Separar componentes, pantallas, estilos y servicios en carpetas distintas para facilitar el mantenimiento.

### 2. Usar componentes reutilizables

Evitar repetir código creando componentes personalizados reutilizables.

### 3. Evitar lógica pesada en las vistas

Mover funciones complejas a archivos de servicios o helpers.

### 4. Utilizar `StyleSheet`

Usar `StyleSheet.create()` en lugar de estilos inline para mejorar rendimiento y organización.

```jsx
const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

### 5. Manejar correctamente el estado

Utilizar `useState`, `useEffect` o librerías como Context API para mantener el código limpio.

### 6. Nombrar variables correctamente

Usar nombres descriptivos y consistentes.

```jsx
const nombreUsuario = "Juan";
```

### 7. Comentar código importante

Agregar comentarios donde la lógica pueda resultar difícil de entender.

---

## Estructura de Proyecto

Ejemplo básico de estructura en React Native:

```plaintext
MiProyecto/
│
├── assets/          # Imágenes, fuentes y recursos
├── components/      # Componentes reutilizables
├── screens/         # Pantallas principales
├── navigation/      # Navegación de la app
├── services/        # Consumo de APIs y lógica externa
├── styles/          # Estilos globales
├── App.js           # Archivo principal
├── package.json     # Dependencias del proyecto
└── README.md        # Documentación
```

### Descripción rápida

* **assets/** → Recursos multimedia.
* **components/** → Botones, tarjetas, inputs, etc.
* **screens/** → Vistas principales.
* **navigation/** → Configuración de navegación.
* **services/** → Funciones para APIs o base de datos.

---

## Tipos de datos

### String

```jsx
const nombre = "Benjamin";
<Text>{nombre}</Text>
```

### Number

```jsx
const edad = 20;
<Text>{edad}</Text>
```

### Boolean

```jsx
const activo = true;
<Text>{activo ? "Activo" : "Inactivo"}</Text>
```

### Array

```jsx
const frutas = ["Manzana", "Pera", "Uva"];
<Text>{frutas[0]}</Text>
```

### Object

```jsx
const usuario = {
  nombre: "Benjamin",
  carrera: "TI"
};

<Text>{usuario.nombre}</Text>
```

### Null

```jsx
const dato = null;
<Text>{dato}</Text>
```

### Undefined

```jsx
let valor;
<Text>{String(valor)}</Text>
```
