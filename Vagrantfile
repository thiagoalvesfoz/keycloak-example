require_relative 'cluster.rb'

clusters = @clusters

Vagrant.configure("2") do |config|
  
  clusters.each do |hostname, info| 

    config.vm.define hostname do |cfg|

      cfg.vm.box = info[:box_image]
      cfg.vm.box_check_update = false
      cfg.vm.network "private_network", ip: info[:ip]

      cfg.vm.provider :virtualbox do |vb, override|
        vb.name = hostname
        vb.memory = info[:mem] if info[:mem]
        vb.cpus = info[:cpus] if info[:cpus]
      end 

      cfg.vm.provision :shell, path: info[:script] if info[:script]
      cfg.vm.provision :file,  source: info[:folder], destination: "/home/vagrant/" if info[:folder]
      cfg.vm.provision :shell, inline: info[:entrypoint], run: "always" if info[:entrypoint]

    end #end config
  end #end loop
  
end #end vagrant