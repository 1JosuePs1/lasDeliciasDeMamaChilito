# Las Delicias de Mamá Chilito

Sitio en React, TypeScript y Vite con catálogo y pedidos por WhatsApp.

## Desarrollo

```sh
npm install
npm run dev
```

Para comprobar la compilación y el lint: `npm run build` y `npm run lint`.

El catálogo y el número de WhatsApp se encuentran en `src/data/catalog.ts`. Los estilos de la página utilizan CSS Modules; los estilos globales básicos están en `src/index.css`. Los precios se recuperaron del sitio anterior y son de referencia: deben confirmarse con el negocio antes de publicarlos. El pedido abre WhatsApp con el mensaje preparado; el cliente debe enviarlo allí. Las fotografías originales están en `public/images`.
