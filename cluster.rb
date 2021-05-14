
@clusters = {
  "keycloak" => { 
    :box_image => "generic/ubuntu1804", 
    :ip => "192.168.10.50", 
    :mem => 1024,
    :script => "./keycloak.sh",
    :folder => "./keycloak",
    :entrypoint => "cd keycloak && docker-compose up -d"
  },
  "frontend" => { 
    :box_image => "generic/ubuntu1804",
    :ip => "192.168.10.100", 
    :mem => 1024,
    :script => "./frontend.sh",
    :entrypoint => "docker run --rm -itd -p 3000:3000 thiagoalvesfoz/react-cis:latest"
  }
}