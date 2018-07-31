<template>
    <div class="product">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
            
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="imglist!=0" class="pic-box">
                                <ProductZoomer
                                :baseImages="images"
                                :base-zoomer-options="zoomerOptions"
                                ></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.zhaiyao}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==0}" @click="buyNum>0?buyNum--:0">
                                                        <i class="el-icon-minus" ></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity">
                                                        <i class="el-icon-plus" ></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="isshow=true" href="javascript:;" :class="{selected:isshow}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isshow=false" href="javascript:;" :class="{selected:!isshow}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div v-html="goodsinfo.content" class="tab-content entry" style="display: block;" v-show="isshow">
                                
                            </div>
                            <div class="tab-content" style="display: block;" v-if="isshow==false">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="componentscontent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="SubmitComments" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box" >
                                        <p v-if="messageList ==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box" >
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <Page :total="totalCount" show-elevator show-sizer  placement='top' :page-size="pageSize" @on-change="pageChange($event)" @on-page-size-change="pageSizeChange($event)" :page-size-opts='[5,10,15,20]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <BackTop></BackTop>
        <img v-if="imglist.length!=0" style="display:none" :src="imglist[0].original_path" class="carImg"   alt="">
    </div>
    
</template>

<script>
// 引入模块 moment
import ProductZoomer from "vue-product-zoomer";
// 接口调用
import $ from "jquery";
// http://47.106.148.205:8899/site/goods/gettopdata/goods
export default {
  name: "goodsinfo",
  // 数据
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      isshow: true,
      componentscontent: "",
      buyNum: 1,
      pageIndex: 1,
      pageSize: 5,
      images: {
        normal_size: []
      },
      messageList: [],
      totalCount: 0,
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  // 即将显示时调用
  beforeMount() {
    // console.log('即将要显示了哦');
  },
  components: {
    ProductZoomer
  },
  methods: {
    getcomments() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )

        .then(response => {
          // 保存数据

          this.messageList = response.data.message;
          this.totalCount = response.data.totalcount;
        })
        .catch(() => {
          // console.log(error);
        });
    },
    getgoodsInfo() {
      this.imglist = [];
      this.images.normal_size = [];
      this.axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // 保存数据
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(() => {
          // console.log(error);
        });
    },
    SubmitComments() {
      if (this.componentscontent == "") {
        this.$Message.error({
          content: "不可以为空",
          // duration: 3
          closable: true
        });
        return;
      } else {
        this.axios
          .post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
              commenttxt: this.componentscontent
          })
          .then(response => {
            //   console.log(response)
            if (response.data.status == 0) {
              // 成功了
              // 提示用户
              this.$Message.success("评论发表成功!!");
              // 重新获取数据 看到了第三页
              // 去第一页
              this.pageIndex = 1;
              this.getcomments();
            }
          })
          .catch(err => {
            //   console.log(err);
          });
        
      }
      this.componentscontent = "";
    },
    cartAdd() {
      let addCar = $("#buyButton .add").offset();
      let carOffset = $(".icon-cart").offset();
      $(".carImg")
        .show()
        .addClass("move")
        .css(addCar)
        .animate(carOffset, 1000, () => {
          $(".carImg")
            .removeClass("move")
            .hide();
        });
      this.$store.commit("buyGoods", {
        goodsId: this.$route.params.id,
        goodsNum: this.buyNum
      });
    },
    pageChange(page) {
      this.pageIndex = page;
      this.getcomments();
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getcomments();
    }
  },
  // 显示出来调用
  mounted() {},
  created() {
    this.getgoodsInfo();
    this.getcomments();
  },
  watch: {
    // to 新值  from 老值
    $route(to, from) {
      // 重新获取商品数据
      this.getgoodsInfo();
      //   重新获取评论数据
      this.getcomments();
    }
  }
};
</script>

<style s>
@import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css");
.inline-zoomer-zoomer-box {
  width: 368px;
}
.thumb-list img {
  height: 78px;
  width: 78px;
}
.control {
  text-align: center;
}
.carImg {
  position: absolute;
  width: 40px;
  top: 0;
  right: 0;
}
.carImg.move {
  transform: scale(0.5, 0.5) rotateZ(3600deg);
  opacity: 0.4;
  transition: transform 1s, opacity 1s;
}
</style>


