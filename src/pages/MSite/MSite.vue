<template>
    <section class="msite">
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'">
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-person"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>

                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import ShopList from '../../components/ShopList/ShopList'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                baseImageUrl:'https://fuss10.elemecdn.com'
            }
        },
        mounted(){
            this.$store.dispatch('getCategorys')
            this.$store.dispatch('getShops')




        },
        computed:{
            ...mapState(['address','categorys','userInfo']),
            //这里的categorysArr是一个二位数组。要从categorys来。
            categorysArr(){
                const {categorys} = this
                //外层数组
                const arr = []
                //内层数组
                let minArr = []
                categorys.forEach(c=>{
                    //当内层数组的长度达到8时，就把数组置空
                    if (minArr.length ===8){
                        minArr = []
                    }
                    //当内层的数组长度为0时，先把这个数组push到外层数组中。
                    if (minArr.length ===0){
                        arr.push(minArr)
                    }
                    //c是箭头函数中从categorys中拿出来的单个元素，所以单个元素要push到内层数组中。
                    minArr.push(c)
                })
                return arr
            }
        },
        watch:{
            //使用监听属性监听categorys这个属性，看它的值是否有变化
            categorys(){
                //将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
                //它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
                //这是this.$nextTick函数的定义。
                //说明：
                //      监听属性已经在监听categorys的值是否有变化，那我们把this.$nextTick写在监听属性中的
                //      意思就是需要等待categorys有了数据变化。但是只是有数据变化还不行，因为ajax请求到了需
                //      要更新的数据，但是还没有异步刷新数据。而这个函数就是可以在数据修改之后调用。所以相当
                //      于我们已经等待请求回来的数据异步刷新完成，这个时候我们再创建轮播图对象就对了。
                this.$nextTick(()=>{
                    //当页面上的元素挂载完毕之后创建一个swiper的对象
                    new Swiper('.swiper-container',{
                        //可以循环轮播
                        loop:true,
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })
            }
        },
        components: {
            HeaderTop,
            ShopList
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px

</style>