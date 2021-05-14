# INSTRUÇÕES

### REQUISITOS

- Vagrant
- Virtualbox
- 6GB Ram

---

### 1. No diretório frontend

renomear o arquivo `.env.example` para `.env`

### 2. Iniciar a VM

```
vagrant up
```

### 3. Logue no keycloak

```
http://192.168.10.50:8080
```

OBS: crie uma conta de usuário para o realm CIS

### 4. Teste as rotas privadas

```
http://192.168.10.100:3000/dashboard
```
