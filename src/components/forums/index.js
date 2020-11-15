import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu, Container, Label, Icon, Segment, Button, Image, Grid, Item, Header} from 'semantic-ui-react';
import {compareForumsData} from '../../utils';
import ReactHtmlParser from 'react-html-parser';
import MenuForumsComponent from '../dummy/forums/menuForumcomponent';
import ErrorComponent from '../dummy/errorComponent';
import {fetchSiteData} from '../../store/slices/forumsSlice';

const forumsData = [
       
        {
            id: 2,
            name: "Почему Вы так ненавидите Белтелеком?",
            site: 1,
            count: 10,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=2"
        },
        {
            id: 3,
            name: "IPTV. Обсуждение. Решение технических вопросов.",
            site: 1,
            count: 0,
            topicsUrl: null
        },
        {
            id: 4,
            name: "ByFly. Техническая помощь. Настройка.",
            site: 1,
            count: 12,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=4"
        },
        {
            id: 6,
            name: "ZALA.by",
            site: 1,
            count: 0,
            topicsUrl: null
        },
        {
            id: 1,
            name: "ByFly. Обсуждение.",
            site: 1,
            count: 20,
            topicsUrl: "http://172.24.64.1:8000/forums/v1/topics/?site=1"
        },
        {
            id: 5,
            name: "Задай вопрос \"Белтелекому\"",
            site: 1,
            count: 0,
            topicsUrl: null
        },
   
    ]




const ForumsMenuItem = (props) =>{

    return (
        <Menu.Item 
            {...((props.count > 0 && !props.active) ? {style: {cursor:'pointer'}} : {})}
            name={props.id}
            active={props.active}
            onClick= {props.handleClick} 
        >
            {props.count > 0 &&
                <Label color='teal' floating >{props.count}</Label>
            }    
            {props.name}
            
        </Menu.Item>
    )
}



const HtmlComponent1 = (props) =>{
    
    const ht = `
    <blockquote class="uncited"><cite>Gerasimus:</cite>
    <p>Сеть Byfly WIFI</p>
    </blockquote>
    <blockquote class="uncited"><cite>Gerasimus:</cite>
    <p>Как можно просто усилить сигнал</p>
    </blockquote>
    <p> Модемом Byfly <br/>Модемом Byfly + свой роутер, репитер \ WDS - что угодно.</p>`

    return (
        <div>{ ReactHtmlParser(ht) }</div>
    )
}

const HtmlComponent2 = (props) => {

    const ht = `<blockquote class="uncited"><cite>BlackNFS:</cite>
    <div><p>При переходе всё равно даёт 90 пинг, с ВПН странновато работает, скорее зависит от загрузки.
    <div class="msgpost-spoiler">
    <div class="msgpost-spoiler-outer">
    <div class="msgpost-spoiler-i"><a class="msgpost-spoiler-hd" href="#">Riot</a></div>
    <div class="msgpost-spoiler-txt">4 ms 3 ms 4 ms asbr9.net.belpak.by [93.85.80.238]<br/>80 ms 75 ms 74 ms pr02.fra02.riotdirect.net [80.81.193.162]<br/>85 ms 88 ms 90 ms ae2.er01.ams01.riotdirect.net [104.160.159.180]<br/>90 ms 85 ms 80 ms 104.160.141.105<br/>81 ms 80 ms 82 ms 185.40.64.65</div>
    </div>
    </div>
    <p></p>
    </p></blockquote>
    <p> Немного не понял фразу. В смысле при переходе?<br/>Пинг в районе 100 был вроде и у человека на МТС (если не ошибаюсь), когда он в то время в топике провайдера своего скидывал трассировку до этого адреса (минуя серверы в РФ) в вечернее (19.00-00.00) время.</p>
    <blockquote class="uncited"><cite>BlackNFS:</cite>
    <p>И классический Франкфурт
    <div class="msgpost-spoiler">
    <div class="msgpost-spoiler-outer">
    <div class="msgpost-spoiler-i"><a class="msgpost-spoiler-hd" href="#">скрытый текст</a></div>
    <div class="msgpost-spoiler-txt">Водафон<a href="https://www.speedtest.net/result/10415806586">
    <div><img class="msgpost-img" src="https://www.speedtest.net/result/10415806586.png"/></div>
    <p></p></a><br/>GTT<a href="https://www.speedtest.net/result/10415844356">
    <div><img class="msgpost-img" src="https://www.speedtest.net/result/10415844356.png"/></div>
    <p></p></a></div>
    </div>
    </div>
    <p>Вот вроде ip того самого сервера от Водафон - 145.253.248.206 (на него спидтест стучится)</p>
    </p></blockquote>
    <div class="msgpost-spoiler">
    <div class="msgpost-spoiler-outer">
    <div class="msgpost-spoiler-i"><a class="msgpost-spoiler-hd" href="#">скрытый текст</a></div>
    <div class="msgpost-spoiler-txt">
    <div><img class="msgpost-img" src="https://content.onliner.by/forum/2534987/800x800/f284eeae3735c67194612ca84d512f1c.jpeg" title="f284eeae3735c67194612ca84d512f1c.jpeg"/></div>
    <p>level3 мелькает с проблемами из РБ еще и тут<br/><!-- m:"https://eu.forums.blizzard.com/ru/overwatch/t/%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0-%D1%81-%D0%B2%D1%8B%D1%81%D0%BE%D0%BA%D0%B8%D0%BC-%D0%BF%D0%B8%D0%BD%D0%B3%D0%BE%D0%BC/24673" --><a class="postlink" href="https://eu.forums.blizzard.com/ru/overwatch/t/%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0-%D1%81-%D0%B2%D1%8B%D1%81%D0%BE%D0%BA%D0%B8%D0%BC-%D0%BF%D0%B8%D0%BD%D0%B3%D0%BE%D0%BC/24673" target="_blank">https://eu.forums.blizzard.com/ru/overwatch/t/%D0%BF%D1%80%D0%BE% ... 0%BC/24673</a><!-- m:"https://eu.forums.blizzard.com/ru/overwatch/t/%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0-%D1%81-%D0%B2%D1%8B%D1%81%D0%BE%D0%BA%D0%B8%D0%BC-%D0%BF%D0%B8%D0%BD%D0%B3%D0%BE%D0%BC/24673" --><br/>например.</p></div>
    </div>
    </div>
    <p>Вообще, у меня остается такое чувство, что РБ немного проклята в плане интернета. И чисто субъективное ощущение, что по вечерам (~19.00-00.00) тупо рубят частично шлюзы на внешку (причем, возможно, не только в БТК, но и на каналах от НЦОТ).<br/>Вот пример пинга на 185.40.64.65 в период, когда пинг с моего компьютера был в районе 90-100мс полчасика примерно назад:
    <div class="msgpost-spoiler">
    <div class="msgpost-spoiler-outer">
    <div class="msgpost-spoiler-i"><a class="msgpost-spoiler-hd" href="#">скрытый текст</a></div>
    <div class="msgpost-spoiler-txt">хотя я и без понятия, насколько можно доверять показаниям с данного сайта
    <div><img class="msgpost-img" src="https://content.onliner.by/forum/2534987/800x800/21f0b3107f49e64b82f9ce92b027502e.jpeg" title="21f0b3107f49e64b82f9ce92b027502e.jpeg"/></div>
    <div><img class="msgpost-img" src="https://content.onliner.by/forum/2534987/800x800/7d61d1a0c46b5eb7575ba17a60e3d9bc.jpeg" title="7d61d1a0c46b5eb7575ba17a60e3d9bc.jpeg"/></div>
    </div>
    </div>
    </div>
    <p>Вот тот же 185.40.64.65, когда случилась "белорусская магия" сегодня почти в 00.00, начали всякие Ростелекомы (и прочие) в Москве нормально (с большего) по тарифу скорость показывать.
    <div class="msgpost-spoiler">
    <div class="msgpost-spoiler-outer">
    <div class="msgpost-spoiler-i"><a class="msgpost-spoiler-hd" href="#">скрытый текст</a></div>
    <div class="msgpost-spoiler-txt">13.11.2020 23.53
    <div><img class="msgpost-img" src="https://content.onliner.by/forum/2534987/800x800/057684ece04d243eaa42acd2097a9ad5.jpeg" title="057684ece04d243eaa42acd2097a9ad5.jpeg"/></div>
    <p>а вот я сделал скрин в 00.08:
    <div><img class="msgpost-img" src="https://content.onliner.by/forum/2534987/800x800/47181c42d7222508d83a8a477ccfb353.jpeg" title="47181c42d7222508d83a8a477ccfb353.jpeg"/></div>
    <p></p></p></div>
    </div>
    </div>
    <p>Так оно нынче играбельно в вечерний период с пингом под 100 (хотя бы на уровне доавгустовских ощущений) или те же Фаберже, но по другому маршруту? Если ВПН не использовать.</p>
    </p></p></div>`

    return (
        <div>{ ReactHtmlParser(ht) }</div>
    )
}

const TopicItem = (props) =>{

    return (
            <Segment basic>
                <Segment raised className="topic">
                        <Item.Group>
                        <Item>
                            <Item.Content>
                            <Item.Meta className="topic-meta">
                                <h5 className="message-header-title">Onliner User NikName</h5>
                                <span className="message-date">12.11.2020 11:15</span>
                            </Item.Meta>
                            <Item.Description>
                                <Segment color='black' basic className="topic-inner">
                                  <HtmlComponent1/>  
                                </Segment>
                                
                            </Item.Description>
                            <Item.Extra><a href="https://forum.onliner.by/viewtopic.php?t=1736876&amp;p=108662567">Перейти на сайт</a></Item.Extra>
                            </Item.Content>
                        </Item>
                        </Item.Group>
                </Segment>
                <Segment raised  className="topic topic-odd">
                    <Item.Group>
                    <Item>
                        <Item.Content>
                        <Item.Meta className="topic-meta">
                                <h5 className="message-header-title">Onliner User NikName</h5>
                                <span className="message-date">12.11.2020 11:15</span>
                            </Item.Meta>
                        <Item.Description>
                        <Segment color='black' basic className="topic-inner">
                                    <HtmlComponent2/>
                                </Segment>
                        </Item.Description>
                        <Item.Extra><a href="https://forum.onliner.by/viewtopic.php?t=1736876&amp;p=108662567">Перейти на сайт</a></Item.Extra>
                        </Item.Content>
                    </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            
        
    )
}

const TopicsContainer = (props) => {

    
    return (
        <Segment basic>
            <Grid > 
                <Grid.Row only="mobile tablet" >
                    <Grid.Column only='mobile tablet'>
                        <Menu fluid vertical>
                            {forumsData.sort(compareForumsData).map(
                                (item, index) =>
                                item.count > 0 && <ForumsMenuItem key={item.id} 
                                                        active={index === 0}  
                                                        name = {item.name}
                                                        id = {item.id.toString()}
                                                        count = {item.count}
                                                    />
                            )}
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={5} only="computer">
                        <Menu fluid vertical tabular>
                           {forumsData.sort(compareForumsData).map(
                               (item, index) => <ForumsMenuItem key={item.id} 
                                                    active={index === 0}  
                                                    name = {item.name}
                                                    id = {item.id.toString()}
                                                    count = {item.count}
                                                />
                           )}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                        
                            <TopicItem/>
   
                    </Grid.Column>
                </Grid.Row>
            </Grid>
               
        </Segment>
    )
}



const ForumsComponent = (props) => {
    
    useEffect(() => {
        props.fetchSiteData();
      }, []);

    return (
        <Container>
            {props.siteData.error === null ?
                <Segment.Group>
                    <MenuForumsComponent siteData={props.siteData.data}
                                        activeIndex = {props.siteMenuActiveIndex}
                    />
                    <TopicsContainer/>
                </Segment.Group>
            : <ErrorComponent/>
        } 
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {
        siteData: state.forumsSlice.siteData,
        siteMenuActiveIndex: state.forumsSlice.siteMenuActiveIndex,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSiteData, 
      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
