---
id: wsl2
title: Working with XKF from Windows
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The reason for this documentation is that we are using a number of Linux-based tools to be able to have a good integration with Windows, we recommend to use Linux as a base for this.
This document is verified using Ubuntu version 20.04 but other distributions will most likely work.

## Installation of WSL2 - Windows Subsystem for Linux

[Install via Powershell](https://docs.microsoft.com/en-us/windows/wsl/install)

Installation is also possible via Microsoft Store. Search for “linux”.

Make sure that Windows Subsystem for Linux is enabled as a feature in Windows.

In Windows: Go to Control Panel → Programs and Features.

In the left-hand menu, select “Turn Windows features on or off”

<img alt="wsl-enable" src={useBaseUrl("img/assets/xks/developer-guide/wsl-enable.png")} />

## Install Docker-Desktop

[Download and install Docker.](https://www.docker.com/products/docker-desktop)

Once installation is complete, verify that the application works. We experienced issues when trying to start Docker-desktop within a managed organization using AD accounts, this caused an error with us not being members of a group called “docker-users“.
To solve this, open up “Computer Management” in Windows as an administrator. Navigate to “local users and groups” → Groups and locate the "docker-users" group and double-click.Press “Add” and search for “Authenticated Users” and add to the group.

Now sign out from Windows and sign back in, and the Docker application should work.

Verify in settings that the WSL2-based engine is used.

<img alt="docker1" src={useBaseUrl("img/assets/xks/developer-guide/docker1.png")} />

Also under settings, go to Resources → WSL Integration and verify that you have access to the WSL integration with your installed WSL (in this case Ubuntu), and make sure it is checked.

<img alt="docker2" src={useBaseUrl("img/assets/xks/developer-guide/docker2.png")} />

To verify functionality:

In your Ubuntu WSL2 instance - Run the command:

```shell
docker run hello-world
```

Wait for the image to be pulled and if everything works properly the output should be:

> Hello from Docker!
> This message shows that your installation appears to be working correctly.

## Utilising Make with WSL2, Terraform and Docker

We have noticed when running Terraform from within our Ubuntu instance, that there appears to be some network issues. We saw quite slow network connections, probably caused by the TCP connection, which resulted in the following error:

> │ Error: Failed to install provider
> │
> │ Error while installing hashicorp/azurerm v2.64.0: local error: tls: bad record MAC

We ran the Terraform command again - and it worked perfectly.

## Issues

### File lock issues

If your `.azure` folder is mounted towards Windows from your WSL2 environment we have seen potential lock issues when running terraform and `azure-cli 2.32.0`, this might apply to other versions as well.

We think this have something to do with how WSL2 and Windows manages locking of files, to workaround you can make sure that your `.azure` folder is only in your Linux environment.

Assuming that you have not defined a custom `AZURE_CONFIG_DIR` you can perform the following to verify you are mounting your `.azure` folder to Windows:

```shell
$ cd
$ ls -la
drwx------ 61 user1 user1    4096 Jan 14 09:21 .
drwxr-xr-x  4 root  root     4096 Feb 12  2021 ..
drwxr-xr-x  7 user1 user1    4096 Dec 12 13:04 .azure -> /mnt/c/Users/user1/.azure
```

Running the following commands will create a new `.azure` folder in your current working directory and tell `azure-cli` to use that folder to store its login data.
Remember that the `export` command only is per terminal. You can make the config persistent by adding the export command to your `.bashrc` file located in your home folder.

```shell
export AZURE_CONFIG_DIR=$(pwd)/.azure
# Store Azure CLI configuration here
[ -d $(pwd)/.azure ] || mkdir $(pwd)/.azure
# login to azure agaiin
az login
```

This is a example how the traceback look liked when we encountered this error:

```shell
│ Error: getting authenticated object ID: Error parsing json result from the Azure CLI: Error waiting for the Azure CLI: exit status 1: ERROR: The command failed with an unexpected error. Here is the traceback:
│ ERROR: [Errno 2] No such file or directory
│ Traceback (most recent call last):
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/command_operation.py", line 352, in handler
│ client = self.client_factory(self.cli_ctx) if self.client_factory else None
│ TypeError: get_graph_client_signed_in_users() missing 1 required positional argument: '_'
│
│ During handling of the above exception, another exception occurred:
│
│ Traceback (most recent call last):
│ File "/opt/az/lib/python3.6/site-packages/knack/cli.py", line 231, in invoke
│ cmd_result = self.invocation.execute(args)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/__init__.py", line 657, in execute
│ raise ex
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/__init__.py", line 720, in _run_jobs_serially
│ results.append(self._run_job(expanded_arg, cmd_copy))
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/__init__.py", line 712, in _run_job
│ return cmd_copy.exception_handler(ex)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/command_modules/role/commands.py", line 69, in graph_err_handler
│ raise ex
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/__init__.py", line 691, in _run_job
│ result = cmd_copy(params)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/__init__.py", line 328, in __call__
│ return self.handler(*args, **kwargs)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/commands/command_operation.py", line 354, in handler
│ client = self.client_factory(self.cli_ctx, command_args) if self.client_factory else None
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/command_modules/role/commands.py", line 89, in get_graph_client_signed_in_users
│ return _graph_client_factory(cli_ctx).signed_in_user
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/command_modules/role/_client_factory.py", line 25, in _graph_client_factory
│ resource=cli_ctx.cloud.endpoints.active_directory_graph_resource_id)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/_profile.py", line 335, in get_login_credentials
│ credential = self._create_credential(account, client_id=client_id)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/_profile.py", line 588, in _create_credential
│ return identity.get_user_credential(username_or_sp_id)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/auth/identity.py", line 182, in get_user_credential
│ return UserCredential(self.client_id, username, **self._msal_app_kwargs)
│ File "/opt/az/lib/python3.6/site-packages/azure/cli/core/auth/msal_authentication.py", line 41, in __init__
│ accounts = self.get_accounts(username)
│ File "/opt/az/lib/python3.6/site-packages/msal/application.py", line 872, in get_accounts
│ accounts = self._find_msal_accounts(environment=self.authority.instance)
│ File "/opt/az/lib/python3.6/site-packages/msal/application.py", line 912, in _find_msal_accounts
│ query={​​"environment": environment}​​)
│ File "/opt/az/lib/python3.6/site-packages/msal_extensions/token_cache.py", line 53, in find
│ with CrossPlatLock(self._lock_location):
│ File "/opt/az/lib/python3.6/site-packages/msal_extensions/cache_lock.py", line 29, in __enter__
│ file_handle = self._lock.__enter__()
│ File "/opt/az/lib/python3.6/site-packages/portalocker/utils.py", line 199, in __enter__
│ return self.acquire()
│ File "/opt/az/lib/python3.6/site-packages/portalocker/utils.py", line 161, in acquire
│ fh = self._prepare_fh(fh)
│ File "/opt/az/lib/python3.6/site-packages/portalocker/utils.py", line 194, in _prepare_fh
│ fh.truncate(0)
│ FileNotFoundError: [Errno 2] No such file or directory
│ To open an issue, please run: 'az feedback'
│
│ with provider["registry.terraform.io/hashicorp/azuread"],
│ on main.tf line 19, in provider "azuread":
│ 19: provider "azuread" {​​}​​
```
