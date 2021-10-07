---
Installing WSL2 and Docker on Windows and using Make.
---

## Installation of WSL2 - Windows Subsystem for Linux

Install via Powershell follow this link 

Install WSL | Microsoft Docs

Installation is also possible via Microsoft Store. Search for “linux”.

For this [ISSUE](https://github.com/XenitAB/azure-devops-templates/issues/69) we used Ubuntu version 2004.2021.825.0

Important for this to work is to make sure that Windows Subsystem for Linux is enabled as a feature in Windows.

In Windows: Go to Control Panel → Programs and Features.

In the left-hand menu, select “Turn Windows features on or off”

![wsl-enable](https://user-images.githubusercontent.com/91601778/136399733-d7acf799-1748-42e8-8e2d-9f05bd2a1f53.jpeg)

## Install Docker-Desktop.

[Download and install Docker.](https://www.docker.com/products/docker-desktop)

Once installation is complete, verify that the application works. We experienced issues when trying to start Docker-desktop within a managed organisation using AD accounts, this caused an error with us not being members of a group called “docker-users“.

To solve this, open up “Computer Management” in Windows as an administrator. Navigate to “local users and groups” → Groups and locate the "docker-users" group and double-click. Press “Add” and search for “Authenticated Users” and add to the group.

Now sign-out from Windows and back in, and Docker application should work.

Verify in settings, WSL2 based engine is used.

![Docker1](https://user-images.githubusercontent.com/91601778/136399809-dbe5dc4c-5b24-4754-975e-1bda1b1993bc.jpeg)


Also under settings. Go to Resources → WSL Integration and verify that you have access to the WSL integration with your installed WSL. In this case Ubuntu and make sure it is checked.
 
![Docker2](https://user-images.githubusercontent.com/91601778/136399892-f3e8b0f3-edbc-4c8d-a311-63e1b65b3db8.jpeg)

To verify functionality:

In WSL2. Run the command:

> docker run hello-world

Wait for the image to be pulled and if everything works properly the output should be:


>Hello from Docker!
>This message shows that your installation appears to be working correctly.
 

## Utilising Make with WSL2, Terraform and Docker.

First time we ran Make - It worked great. Second time we ran into the following error. Which seemed to be a temporary error, caused by slow/bad tcp-connection.


>│ Error: Failed to install provider
>│
>│ Error while installing hashicorp/azurerm v2.64.0: local error: tls: bad record MAC
