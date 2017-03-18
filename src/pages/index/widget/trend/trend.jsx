import React,{Component} from 'react';
import Footer from 'footer/footer';
import List from '../list/list';
import Search from '../search/search';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as acts from 'index/redux/actions';
import './trend.scss';

class Trend extends Component{
    componentWillReceiveProps(nextProps,nextState) {
        console.log('trend componentWillReceiveProps');
        console.log(nextProps)
        if(nextProps.params.type != this.props.type && nextProps.params.cate != this.props.cate){
            //this.fAction(nextProps)
        }
       	//this.fAction(nextProps);
    }
    componentDidMount(){
        console.log('trend mount');
       	//this.fAction(this.props);	
    }
    fAction(props){
        // const type = props.params.type;
        // const cate = props.params.cate;
        // const actions = props.actions;
        // actions.fGetCateListStart({type,cate});
        // actions.fGetArticleListStart({type,cate});	
    }
    render() {
        const type = this.props.params.type;
        const cate = this.props.params.cate;
        const {fSearchArticlesStart,fGetCateListStart,fGetArticleListStart} = this.props.actions;
        return (
            <div>
                <div className="recommended">
                    {/*分类切换*/}
                    <div className="page-title">
                        <ul className="recommened-nav navigation clearfix">
                            {/*用户未订阅专题或人，或者未完成订阅 or 用户订阅列表已准备就绪*/}
                            <li data-name="trending_notes" className={type=='hot' ? 'active' : ''}>
                                <a data-pjax="true" href="/#hot/now">
                                    <i className="fa fa-bars">
                                    </i>
                                    热门文章
                                </a>
                            </li>
                            <li data-name="recommended_notes" className={type=='notes' ? 'active' : ''}>
                                <a data-pjax="true" href="/#notes/all">
                                    <i className="fa fa-bars">
                                    </i>
                                    今日看点
                                </a>
                            </li>
                            <li data-name="subscription_notes" className={type=='subscribe' ? 'active' : ''}>
                                <a data-pjax="true" href="/#subscribe/all">
                                    <i className="fa fa-bars">
                                    </i>
                                    我的订阅
                                </a>
                            </li>
                            <img className="hide loader-tiny" src={require('./img/tiny.gif')}
                            alt="Tiny" />
                            <li className="search">  
                                <Search fSearchArticlesStart={fSearchArticlesStart}/>             
                            </li>
                        </ul>
                    </div>
                    {/*文章分类*/}
                    <Category fGetCateListStart={fGetCateListStart} type={type} aCate={this.props.oCate.data} />
                    {/*文章列表*/}
                    <List fGetArticleListStart={fGetArticleListStart} type={type} cate={cate} oArticle={this.props.oArticle} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    state => {return {oArticle : state.trend.oArticle,oCate:state.trend.oCate}},
    dispatch => {return { actions: bindActionCreators(acts,dispatch) } }
)(Trend);
    