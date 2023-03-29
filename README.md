# Revealeit
<p>
  <img src="/src/assets/readme.png" alt="Cavity screenshots">
</p>

This project is a client for an online board game where you have to hunt your opponent pieces.

## Release process
Netlify automatically deploy this project whenever master branch receive updates.

## Run the project on your machine
Make sure [traefik](https://github.com/ninjinskii/traefik) is running.
Clone and setup the [revealeit-backend](https://github.com/ninjinskii/revealeit-backend):

```bash
cd revealeit
docker-compose run --rm web yarn install
docker compose up -d
```

You can now access the project at https://revealeit.njk.localhost.
