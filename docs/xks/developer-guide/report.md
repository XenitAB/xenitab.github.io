---
id: reports
title: Reports
---

As a XKS 2.0 customer you get monthly reports to get a quick overview of your XKS production environment.

## Security

Xenit **isn't** responsible for the security of your application but as a part of the report we state
the number of CVE:s in your applications found by our automated scanning tools that we have in XKF.

This is a extra way for at Xenit to help you as a developer but you **can't** rely on Xenit to point out specific security flaws in your application. Security is something that **you and your company** is in charge of we are just trying to visualize some of the data that we have access to.

As a part of XKF we continuously scan all images running in our clusters. To do this we depend on
[starboard](https://github.com/aquasecurity/starboard/) together with [trivy](https://github.com/aquasecurity/trivy/).

If you are using the Xenit CI solution you are by default scanning your container images with Trivy at creation time.
But new CVE:s might have come out since you created your image and that is why continuous scanning of images is important.

For more information how to get deeper information of the CVE reports
look at our [starboard documentation](startboard.md).
