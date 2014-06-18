Vagrant.require_version ">= 1.5.1"

$init_update = <<SCRIPT
if [[ ! -f /apt-get-run ]]; then sudo apt-get update && sudo touch /apt-get-run; fi
SCRIPT

$init_script = <<SCRIPT
    apt-get install -y build-essential curl python-software-properties git
    apt-add-repository ppa:chris-lea/node.js && apt-get update
    apt-add-repository ppa:ondrej/php5 && apt-get update
    apt-get install -y php5 php5-curl php5-mcrypt php5-mysql php5-intl php5-gd
    curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
SCRIPT

$project_home = "/home/vagrant/project"
$script = <<SCRIPT
    #cd #{$project_home}; npm install --quiet --no-bin-links
    #cd #{$project_home}; bem make libs
SCRIPT

customize_cpus = "1"
customize_memory = "256"

Vagrant.configure("2") do |config|
    config.vm.box = "precise64"

    config.vm.network :forwarded_port, guest: 8080, host: 8080
    config.vm.network :private_network, ip: "192.168.66.101"

    config.vm.provider :virtualbox do |vb, override|

        override.vm.box = "hashicorp/precise64"

        vb.customize ["modifyvm", :id, "--cpus",   customize_cpus]
        vb.customize ["modifyvm", :id, "--memory", customize_cpus]
        vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    end

    config.vm.provider :parallels do |p, override|
        override.vm.box = "parallels/ubuntu-12.04"

        p.customize ["set", :id, "--cpus",   customize_cpus]
        p.customize ["set", :id, "--memsize", customize_memory]
    end

    config.vm.synced_folder ".", $project_home

    config.vm.provision :shell, :privileged => true, :inline => $init_update
    config.vm.provision :shell, :privileged => true, :inline => $init_script
    config.vm.provision :shell, :privileged => false, :inline => $script
end