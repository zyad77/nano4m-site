# nano4M Masking Strategies

A visual project page exploring how different masking strategies affect the training and evaluation of a multimodal AI model.

## Overview

This project presents my work on **nano4M**, a multimodal model trained on several data modalities, including RGB tokens, depth tokens, normal map tokens, and scene descriptions.

The objective is to compare multiple masking strategies and analyze how they influence the model’s evaluation loss.

## Masking strategies compared

* **Baseline** — Random masking
* **V1** — Span masking only
* **V2** — Block masking only
* **V3** — Span + Block masking
* **V4** — Span + Block + Random masking

## Website content

The website includes:

* A clear presentation of the project
* The different model variants
* Evaluation loss comparisons
* Training and evaluation insights
* Links to the final report and slides
* Code structure and GitHub links
* Future improvements

## Key result

The final evaluation loss comparison shows that the random masking baseline achieved the lowest final evaluation loss in this setup, while V4 performed better than V2 and V3 but did not outperform the baseline.

This suggests that more complex masking strategies do not always directly lead to lower validation loss, especially when each model is evaluated under its own masking objective.

## Technologies

* Python
* PyTorch
* nano4M / FourM
* W&B logs
* HTML / CSS / JavaScript
* GitHub Pages

## Live page

The website will be available here once deployed:

```text
https://YOUR_USERNAME.github.io/nano4m-masking-strategies/
```

## Author

Created by Zyad Tajeddine.
