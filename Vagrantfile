Vagrant.configure("2") do |config|

  config.vm.define "keycloak" do |config| 
    
    config.vm.box = "generic/ubuntu1804"
    config.vm.box_check_update = false
    config.vm.network "private_network", ip: "192.168.10.50"

    config.vm.provider :virtualbox do |vb|
      vb.name = "keycloak-vm"
      vb.memory = "1024"
      vb.cpus = "1"
    end

  config.vm.provision  "file", source: "./docker-compose.yml", destination: "docker-compose.yml"
  
  config.vm.provision "shell", inline: <<-SHELL
    
    sudo apt-get clean && sudo apt-get update

    # ##################################################################################################################
    # INSTALL DOCKER - DOC: https://docs.docker.com/engine/install/ubuntu/
    # ##################################################################################################################
    sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release -y

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    echo  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io -y
    sudo adduser $USER docker

    # ##################################################################################################################
    # INSTALL DOCKER-COMPOSE - https://docs.docker.com/compose/install/
    # ##################################################################################################################
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    
    # EXECUTE KEYCLOAK
    sudo docker-compose up -d
  
  SHELL

  # config.vm.provision  "shell", path: "./keycloak.sh"
  end
end
