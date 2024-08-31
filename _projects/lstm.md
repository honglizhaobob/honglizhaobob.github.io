---
layout: page
title: LSTM Networks
description: Experimenting with architectures for time-series forecasting
img: assets/img/projects/lstm/lstm_loss.png
importance: 1
category: Technical Interests
---

This is a note where I downloaded publically available stock price data and compared a few different ways to implement LSTM for the purpose of time series forecasting. The note also includes EDA and hypothesis testing, discusses value-at-risk (VaR) as a risk measure through historical sampling.

Several future works remain:

* Feature engineering

* Using LSTM as a surrogate model (of stock price) to price derivatives

<div class="pdf-display-window">
    <iframe src="/assets/pdf/projects/lstm/report.pdf" width="100%" height="100%" style="border: none;"></iframe>
</div>
<style>
.pdf-display-window {
    width: 800px;
    height: 600px;
    border: 2px solid #333;
    overflow: hidden;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>


More information can be found on [github](https://github.com/honglizhaobob/Ensemble_LSTM_Networks).