<template>
  <div class="content">
    <div class="mug">
      <div class="cup"></div>
      <div class="handle"></div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .content {
    display: flex;
    display: -webkit-flex;
    perspective: 300px;
  }

  .mug {
    text-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    margin: 0 auto;
    width: 300px;
    height: 300px;
  }
  .cup {
    background-color: #f0f0f0;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), white 15%, white 25%, rgba(255, 255, 255, 0), white 75%, white 85%, rgba(255, 255, 255, 0)), linear-gradient(rgba(255, 255, 255, 0), #ebebeb);
    border-radius: 150px / 50.01px;
    position: relative;
    width: 216.66px;
    height: 300px;
  }
  .cup img{margin-top: 20px;}
  .cup:after,.cup:before{
    border-radius: 50%;
    content: "";
    display: block;
  }
  .cup::before{
    background-color: #000000;
    background-image: radial-gradient(30px 30px at 20% -22%, #ffffff 80%, rgba(255, 255, 255, 0)), radial-gradient(30px 30px at 80% -22%, #ffffff 80%, rgba(255, 255, 255, 0)), radial-gradient(100% 100% at center bottom, #cccccc 30%, #ebebeb 75%, #f0f0f0);
    box-shadow: 0 0 0.84px 0.84px #f0f0f0 inset;
    margin: 6px auto;
    width: 200.1px;
    height: 80px;
  }
  .cup:after{
    box-shadow: 0 0 9.99px 6.66px #d8d8d8;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80.01px;
    z-index: -1;
  }
  .handle{
    background-color: #f0f0f0;
    background-image: radial-gradient(21px 21px at 52% 19%, #ffffff 70%, rgba(255, 255, 255, 0));
    border-radius: 50.01px 166.68px 166.68px 50.01px / 8.34px 183.33px 183.33px 8.34px;
    box-shadow: -1.68px 0 1.68px 1.68px white inset;
    width: 83.34px;
    height: 183.33px;
  }
  .handle::before {
    background: white;
    border-radius: 30% 100% 100% 20% / 15% 50% 50% 20%;
    box-shadow: 0 0 8.34px 1.68px white, 0 0 7.5px 15px #e4e4e4;
    content: "";
    display: block;
    margin: 30% auto auto 0;
    width: 70%;
    height: 70%;
}
</style>
