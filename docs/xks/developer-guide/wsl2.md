---
id: wsl2
title: Working with XKF from Windows
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The reason for this documentation is that we are using a number of linux based tools to be able to have a good integration with Windows, we recommend to use linux as a base for this.
This document is verified using Ubuntu version 20.04 but other distributions will most likely work.
## Installation of WSL2 - Windows Subsystem for Linux

[Install via Powershell](https://docs.microsoft.com/en-us/windows/wsl/install)

Installation is also possible via Microsoft Store. Search for “linux”.

Make sure that Windows Subsystem for Linux is enabled as a feature in Windows.

In Windows: Go to Control Panel → Programs and Features.

In the left-hand menu, select “Turn Windows features on or off”

<img alt="wsl-enable" src={useBaseUrl("img/developer/wsl-enable.png")} />

## Install Docker-Desktop

[Download and install Docker.](https://www.docker.com/products/docker-desktop)

Once installation is complete, verify that the application works. We experienced issues when trying to start Docker-desktop within a managed organisation using AD accounts, this caused an error with us not being members of a group called “docker-users“. To solve this, open up “Computer Management” in Windows as an administrator. Navigate to “local users and groups” → Groups and locate the "docker-users" group and double-click. Press “Add” and search for “Authenticated Users” and add to the group.

Now sign-out from Windows and back in, and Docker application should work.

Verify in settings, WSL2 based engine is used.

<img alt="docker1" src={useBaseUrl("img/developer/docker1.png")} />

Also under settings. Go to Resources → WSL Integration and verify that you have access to the WSL integration with your installed WSL. In this case Ubuntu and make sure it is checked.

<img alt="docker2" src={useBaseUrl("img/developer/docker2.png")} />

To verify functionality:

In your Ubuntu WSL2 instance - Run the command:

```shell
docker run hello-world
```

Wait for the image to be pulled and if everything works properly the output should be:

>Hello from Docker!
>This message shows that your installation appears to be working correctly.

## Utilising Make with WSL2, Terraform and Docker

We noticed, when running terraform from within our Ubuntu instance, that there appears to be som network issues. We saw quite slow network connections. Probably caused by the TCP connection with the following error:

>│ Error: Failed to install provider
>│
>│ Error while installing hashicorp/azurerm v2.64.0: local error: tls: bad record MAC

We ran the terraform command again - and it worked perfectly.
