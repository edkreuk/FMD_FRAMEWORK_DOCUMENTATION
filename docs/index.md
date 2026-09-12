---
title: "The Fabric Metadata-Driven Framework (FMD)"
---

# The Fabric Metadata-Driven Framework (FMD)

FMD is written and maintained by **[Erwin de Kreuk](https://github.com/edkreuk)** and published under the MIT licence at **[github.com/edkreuk/FMD_FRAMEWORK](https://github.com/edkreuk/FMD_FRAMEWORK)**. This documentation is not his: we read his code and wrote down what it does. Where we found a defect we say so on the page, and we say which pull request fixes it. Where we were wrong, he was right.

FMD is a framework for Microsoft Fabric that loads data from source systems into a lakehouse without you writing a pipeline per source. You describe each table you want in a configuration database, and a fixed set of generic pipelines and Spark notebooks reads that description and does the loading, layer by layer, logging every run.
