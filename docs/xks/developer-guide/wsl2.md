---
id: wsl2
title: Installing WSL2 on Windows
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Installation of WSL2 - Windows Subsystem for Linux

For this we used Ubuntu version 2004.2021.825.0 but other distributions might work, but not verified.

[Install via Powershell](https://docs.microsoft.com/en-us/windows/wsl/install)

Installation is also possible via Microsoft Store. Search for “linux”.

Important for this to work is to make sure that Windows Subsystem for Linux is enabled as a feature in Windows.

In Windows: Go to Control Panel → Programs and Features.

In the left-hand menu, select “Turn Windows features on or off”

<img alt="wsl-enable" src={useBaseUrl("img/assets/xks/developer-guide/wsl-enable.png")} />

## Install Docker-Desktop

[Download and install Docker.](https://www.docker.com/products/docker-desktop)

Once installation is complete, verify that the application works. We experienced issues when trying to start Docker-desktop within a managed organisation using AD accounts, this caused an error with us not being members of a group called “docker-users“.

To solve this, open up “Computer Management” in Windows as an administrator. Navigate to “local users and groups” → Groups and locate the "docker-users" group and double-click. Press “Add” and search for “Authenticated Users” and add to the group.

Now sign-out from Windows and back in, and Docker application should work.

Verify in settings, WSL2 based engine is used.

<img alt="docker1" src={useBaseUrl("img/assets/xks/developer-guide/docker1.png")} />

Also under settings. Go to Resources → WSL Integration and verify that you have access to the WSL integration with your installed WSL. In this case Ubuntu and make sure it is checked.

<img alt="docker2" src={useBaseUrl("img/assets/xks/developer-guide/docker2.png")} />

To verify functionality:

In WSL2. Run the command:

```shell
docker run hello-world
```

Wait for the image to be pulled and if everything works properly the output should be:

>Hello from Docker!
>This message shows that your installation appears to be working correctly.

## Utilising Make with WSL2, Terraform and Docker

First time we ran Make - It worked great. Second time we ran into the following error. Which seemed to be a temporary error, caused by slow/bad tcp-connection.

>│ Error: Failed to install provider
>│
>│ Error while installing hashicorp/azurerm v2.64.0: local error: tls: bad record MAC
