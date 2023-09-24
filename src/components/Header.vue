<template>
  <header>
    <div class="title" @click="$router.push('/')">
      <img src="../assets/logo.svg" alt="">
      <h1>Eterno</h1>
    </div>
    <div class="tabs">
      <router-link to="/" exact :class="{active: $route.path === '/'}"><i class="material-icons">home</i> Accueil</router-link>
      <router-link to="/catalogue" :class="{active: $route.path === '/catalogue'}"><i class="material-icons">movie</i> Catalogue</router-link>
      <router-link to="/favoris" :class="{active: $route.path === '/favoris'}"><i class="material-icons">favorite</i> Favoris</router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
}

.title {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 2.2rem;
  }

  h1 {
    margin-left: 16px;
    font-size: 2.2rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
}

.tabs {
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    margin: 0 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #bdbdbd;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-decoration: none;
    text-align: center;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
    }

    &.active {
      color: #fff;
    }

    i {
      margin-right: 8px;
      font-size: 1.4rem;
      color: #e2e2e2;
    }

    &:nth-child(2) i {
      color: #2196f3;
    }

    &:nth-child(3) i {
      color: #f44336;
    }
  }
}
</style>