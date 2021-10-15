(this.webpackJsonptemplate_react=this.webpackJsonptemplate_react||[]).push([[0],{185:function(e,t,n){},186:function(e,t,n){},199:function(e,t,n){},203:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(69),u=n.n(c),i=(n(185),n(186),n(4)),o=n.n(i),s=n(11),l=n(14),p=n(15),b=n(27),f=n(29),d=n(9),j=n(18),v={SINHALA:"hsl(355, 63%, 34%)",TAMIL:"hsl(21, 100%, 50%)",TAMIL_REDDER:"hsl(5, 100%, 50%)",TAMIL_YELLOW:"hsl(60, 100%, 50%)",MUSLIM:"hsl(165, 100%, 17%)",BUDDHIST:"hsl(43, 100%, 50%)"},h="blue",g="green",O="red",x={SLFP:h,PA:h,UPFA:h,SLPP:v.SINHALA,UNP:g,NDF:g,SJB:g,JVP:O,JJB:O,LSSP:O,TMVP:O,MNA:v.MUSLIM,SLMC:v.MUSLIM,EPDP:v.TAMIL_REDDER,TULF:v.TAMIL,ACTC:v.TAMIL_YELLOW,ITAK:v.TAMIL_YELLOW,AITC:v.TAMIL_REDDER,SLMP:"purple",other:"gray",others:"gray",bharatha:"cyan",burgher:"purple",chetty:v.BLUE,indian_tamil:v.TAMIL,tamil:v.TAMIL,malay:v.MUSLIM,moor:v.MUSLIM,muslim:v.MUSLIM,sinhalese:v.SINHALA,sri_lankan_tamil:v.TAMIL,buddhist:v.BUDDHIST,islam:v.MUSLIM,hindu:v.TAMIL,roman_catholic:"purple",other_christian:"blue",christian:"purple"},m="lk_regions",y=new(n(188)),I=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"buildIndex",value:function(){var e=Object(s.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return r=e.sent,e.abrupt("return",t.reduce((function(e,t,n){return e[t]=r[n],e}),{}));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"invertDict",value:function(e){return Object.entries(e).reduce((function(e,t){var n=Object(d.a)(t,2),r=n[0],a=n[1];return a&&(e[a]||(e[a]=[]),e[a].push(r)),e}),{})}}]),e}(),k=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"number",value:function(e){return e?e>1e6?(e/1e6).toPrecision(3)+"M":e>1e3?(e/1e3).toPrecision(3)+"K":e:"-"}},{key:"percent",value:function(e,t){if(!t||!e)return"-";var n=e/t;return n<.01?"<1%":(100*n).toPrecision(3)+"%"}}]),e}(),T=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"mean",value:function(e){var t=e.length;return j.b.sum(e)/t}},{key:"variance",value:function(t){var n=t.length;return j.b.sum(t.map((function(e){return e*e})))/n-e.mean(t)}},{key:"stdev",value:function(t){return Math.sqrt(e.variance(t))}}]),e}(),C=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"get",value:function(){var e=Object(s.a)(o.a.mark((function e(t,n){var r,a,c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=y.get(t))){e.next=3;break}return e.abrupt("return",JSON.parse(r));case 3:if(!(a=localStorage.getItem(t))){e.next=7;break}return y.set(t,a),e.abrupt("return",JSON.parse(a));case 7:return e.next=9,n();case 9:c=e.sent,u=JSON.stringify(c),y.set(t,u);try{localStorage.setItem(t,u)}catch(i){localStorage.clear()}return e.abrupt("return",c);case 14:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),w=n(90),D=n.n(w),M=n(94),S=n.n(M),N="other",R={moor:"muslim",malay:"muslim",sri_lankan_tamil:"tamil",indian_tamil:"tamil",roman_catholic:"christian",other_christian:"christian"},L=[{getLabel:function(e){return"Ethnicity"},getTableName:function(e){return"regions.2012_census.ethnicity_of_population"},Icon:D.a,configList:[1]},{getLabel:function(e){return"Religion"},getTableName:function(e){return"regions.2012_census.religious_affiliation_of_population"},Icon:D.a,configList:[1]},{getLabel:function(e){return"".concat(e," Presidential Election")},getTableName:function(e){return"regions_ec.".concat(e,"_election_presidential.result")},Icon:S.a,configList:[1982,1988,1994,1999,2005,2010,2015,2019]},{getLabel:function(e){return"".concat(e," Parliamentary Election")},getTableName:function(e){return"regions_ec.".concat(e,"_election_parliamentary.result")},Icon:S.a,configList:[1989,1994,2e3,2001,2004,2010,2015,2020]}],P=L.reduce((function(e,t){var n=t.getTableName,r=t.configList;return[].concat(e,r.map((function(e){return n(e)})))}),[]),_=P[0];var E,A,V={},K=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getTable",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/".concat(m,"/data/gig2/").concat(t,".tsv"),e.next=3,j.d.tsv(n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getTableIndex",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getTable(n);case 2:return r=t.sent,a=e.getValueKeys(r[0]),t.abrupt("return",r.reduce((function(e,t){return e[t.entity_id]=Object.entries(t).reduce((function(e,t){var n=Object(d.a)(t,2),r=n[0],c=n[1];return a.includes(r)&&(c=parseFloat(c),isNaN(c)&&(c=0)),e[r]=c,e}),{}),e}),{}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"getTableIndexIndex",value:function(){var t=Object(s.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.get("getTableIndexIndex",e.getTableIndexIndexNoCache);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"getTableIndexIndexNoCache",value:function(){var t=Object(s.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I.buildIndex(P,e.getTableIndex);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"getFirstRow",value:function(e){return Object.values(e)[0]}},{key:"getTotalRow",value:function(t){var n=e.getFirstRow(t);return e.getValueKeys(n).reduce((function(e,n){return e[n]=j.b.sum(Object.values(t).map((function(e){return e[n]}))),e}),{})}},{key:"getValueKeys",value:function(e){return Object.keys(e).filter((function(e){return!(e.includes("total_")||e.includes("_id")||e.includes("result_ut")||e.includes("valid")||e.includes("rejected")||e.includes("polled")||e.includes("electors"))}))}},{key:"getValueEntriesSortedByValue",value:function(t){return e.getValueKeys(t).map((function(e){return[e,t[e]]})).sort((function(e,t){return t[1]-e[1]}))}},{key:"getMaxValueKey",value:function(t){var n=e.getValueKeys(t);return n.reduce((function(e,n){return n!==N&&t[e]<t[n]&&(e=n),e}),n[0])}},{key:"getValueKeyP",value:function(t,n){var r=e.getValueSum(t);return t[n]/r}},{key:"getValueSum",value:function(t){var n=e.getValueKeys(t);return j.b.sum(n.map((function(e){return t[e]})))}},{key:"getValueKeyColor",value:function(e){return x[e]?x[e]:(V[e]||(V[e]=j.a.getRandomHSLA()),V[e])}},{key:"getTableRowColor",value:function(t){var n=e.getMaxValueKey(t);return e.getValueKeyColor(n)}}]),e}(),F=n(3),G={COUNTRY:"country",PROVINCE:"province",DISTRICT:"district",DSD:"dsd",GND:"gnd",PD:"pd",ED:"ed",MOH:"moh",LG:"lg",UNKNOWN:"unknown"},U=Object.values(G),B=(E={},Object(F.a)(E,G.Country,"Country"),Object(F.a)(E,G.PROVINCE,"Province"),Object(F.a)(E,G.DISTRICT,"District"),Object(F.a)(E,G.DSD,"Divisional Secretariat Division"),Object(F.a)(E,G.GND,"Grama Niladhari Division"),Object(F.a)(E,G.PD,"Polling Division"),Object(F.a)(E,G.ED,"Electoral District"),Object(F.a)(E,G.MOH,"Medical Officer of Health Area"),Object(F.a)(E,G.LG,"Local Authority Area"),E),J=(A={},Object(F.a)(A,G.COUNTRY,G.PROVINCE),Object(F.a)(A,G.PROVINCE,G.DISTRICT),Object(F.a)(A,G.DISTRICT,G.DSD),Object(F.a)(A,G.DSD,G.GND),Object(F.a)(A,G.GND,void 0),Object(F.a)(A,G.PD,void 0),Object(F.a)(A,G.ED,[G.PD]),A),H=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getEntType",value:function(e){if("LK"===e.substring(0,2))switch(e.length){case 2:return G.COUNTRY;case 4:return G.PROVINCE;case 5:return G.DISTRICT;case 7:return G.DSD;case 10:return G.GND;default:return G.UNKNOWN}if("EC"===e.substring(0,2))switch(e.length){case 5:return G.ED;case 6:return G.PD;default:return G.UNKNOWN}return"LG"===e.substring(0,2)?G.LG:"MOH"===e.substring(0,3)?G.MOH:G.UNKNOWN}},{key:"getRegionName",value:function(e){return B[e]}},{key:"getEntsByType",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/".concat(m,"/data/ents/").concat(t,".tsv"),e.next=3,j.d.tsv(n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getEntIndexByType",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getEntsByType(n);case 2:return r=t.sent,t.abrupt("return",r.reduce((function(e,t){return e[t.id]=t,e}),{}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"getAllEntIndex",value:function(){var t=Object(s.a)(o.a.mark((function t(){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=U,t.next=3,Promise.all(n.map(function(){var t=Object(s.a)(o.a.mark((function t(n){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getEntIndexByType(n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 3:return r=t.sent,t.abrupt("return",n.reduce((function(e,t,n){return e[t]=r[n],e}),{}));case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"getEnt",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r,a,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.getEntType(n),t.next=3,e.getEntIndexByType(r);case 3:if(a=t.sent,c=a[n]){t.next=7;break}return t.abrupt("return",null);case 7:return c.centroid&&(c.centroid=JSON.parse(c.centroid)),t.abrupt("return",c);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"getParentToChildMap",value:function(){var e=Object(s.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"data/ents/parent_to_child_map.json",e.next=3,j.d.json("data/ents/parent_to_child_map.json");case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getChildType",value:function(e){return J[e]}},{key:"getChildIDs",value:function(){var t=Object(s.a)(o.a.mark((function t(n,r){var a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getEntsByType(r);case 2:return a=t.sent,t.abrupt("return",a.map((function(e){return e.id})).filter((function(e){return e.includes(n)||"LK"===n})));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"getEntTypeLongName",value:function(e){return B[e]?B[e]:j.c.toTitleCase(e)}}]),e}(),z=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"expandOtherOnTableRow",value:function(e,t,n){var r=t.reduce((function(t,n){return t[n]=e[n],t}),{}),a=j.b.sum(n.map((function(t){return e[t]})));return r.other=a,r}},{key:"mergeKeysOnTableRow",value:function(e){return Object.entries(e).reduce((function(e,t){var n=Object(d.a)(t,2),r=n[0],a=n[1],c=R[r]?R[r]:r;return e[c]||(e[c]=0),e[c]+=a,e}),{})}},{key:"mergeKeysOnTable",value:function(t){return Object.entries(t).reduce((function(t,n){var r=Object(d.a)(n,2),a=r[0],c=r[1];return t[a]=e.mergeKeysOnTableRow(c),t}),{})}},{key:"mergeAndExpandOtherOnTable",value:function(t){var n=e.mergeKeysOnTable(t),r=K.getTotalRow(n),a=K.getValueKeys(r),c=K.getValueSum(r),u=a.filter((function(e){return r[e]/c>=.01&&e!==N})),i=Object.values(n).reduce((function(e,t){var n=K.getValueSum(t);return a.reduce((function(r,a){return t[a]/n>=.2&&a!==N&&e.add(a),e}))}),new Set(u)),o=Array.from(i),s=a.filter((function(e){return!i.has(e)})),l=o.map((function(e){return{key:e,value:r[e]}})).sort((function(e,t){return t.value-e.value})).map((function(e){return e.key}));return Object.entries(n).reduce((function(t,n){var r=Object(d.a)(n,2),a=r[0],c=r[1];return t[a]=e.expandOtherOnTableRow(c,l,s),t}),{})}}]),e}(),W=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getMapInfoForCustomMap",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="/".concat(m,"/data/custom_maps/").concat(t,".json"),e.next=3,j.d.json(n);case 3:return r=e.sent,a=r.label_to_region_ids,c=Object.keys(a).reduce((function(e,t){return e[t]={groupID:t,name:t},e}),{}),e.abrupt("return",{mapID:t,name:t,groupIndex:c,groupToRegions:a});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getMapInfoForRegionType",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r,a,c,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.getEntsByType(t);case 2:return n=e.sent,r=n.map((function(e){return{groupID:e.id,name:e.name}})),a=r.reduce((function(e,t){return e[t.groupID]=t,e}),{}),c=n.map((function(e){return e.id})).filter((function(e){return t!==G.PD||"P"!==e.substring(5)})),u=c.reduce((function(e,t){return e[t]=[t],e}),{}),e.abrupt("return",{mapID:"region_type_"+t,name:"By "+H.getEntTypeLongName(t),groupIndex:a,groupToRegions:u});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getMapInfoIndex",value:function(){var t=Object(s.a)(o.a.mark((function t(){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I.buildIndex([G.PROVINCE,G.DISTRICT,G.DSD,G.ED,G.PD],e.getMapInfoForRegionType);case 2:return n=t.sent,t.next=5,I.buildIndex(["sl_new_pds.lk-FINAL.compressed"],e.getMapInfoForCustomMap);case 5:return r=t.sent,t.abrupt("return",Object.assign({},n,r));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"getGroupTableIndex",value:function(e,t){var n=K.getValueKeys(K.getFirstRow(t)),r=Object.entries(e).reduce((function(e,r){var a=Object(d.a)(r,2),c=a[0],u=a[1];return e[c]=u.reduce((function(e,r){return t[r]?Object.entries(t[r]).reduce((function(e,t){var r=Object(d.a)(t,2),a=r[0],c=r[1];return n.includes(a)&&e[a]?e[a]+=c:e[a]=c,e}),e):e}),{}),e}),{});return z.mergeAndExpandOtherOnTable(r)}}]),e}(),Y=n(233),q=n(245),Q=n(234),X=(n(199),n(1)),Z=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"render",value:function(){var e=this.props,t=e.center,n=e.zoom;return Object(X.jsxs)(Y.a,{center:t,zoom:n,children:[Object(X.jsx)(q.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(X.jsx)(Q.a,{zoom:n,position:"bottomright"}),this.props.children]})}}]),n}(r.Component),$=n(248),ee=n(246),te=n(249),ne=n(236),re=n(240),ae=n(250),ce=n(261),ue=n(264),ie=n(259),oe=n(260),se=n(262),le=n(263),pe=n(247);function be(e){var t=e.valueKey;return Object(X.jsx)(ie.a,{align:"right",width:"30",style:{fontWeight:800},children:j.c.toTitleCase(t)},"header-"+t)}function fe(e){var t=e.value,n=e.valueSum,r=e.valueKey,a=e.isMax,c=k.number(t),u=k.percent(t,n),i=t/n,o="white",s="black";a&&(o=K.getValueKeyColor(r),s="white");var l=.2;i>.5?l=i:i>.1?l=.5:i>.01&&(l=.4);var p={backgroundColor:o,opacity:l,borderRadius:3,padding:3};return Object(X.jsx)(ie.a,{align:"right",children:Object(X.jsxs)("div",{style:p,children:[Object(X.jsx)("div",{style:{fontSize:15,color:s},children:u}),Object(X.jsx)("div",{style:{fontSize:9,color:s},children:c})]})})}var de=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={regionEnt:void 0},r}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props.regionID,H.getEntType(t)===G.UNKNOWN){e.next=7;break}return e.next=5,H.getEnt(t);case 5:n=e.sent,this.setState({regionEnt:n});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.regionEnt,t=this.props.regionID,n=H.getEntType(t),r=e?e.name:t;return Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"body2",sx:{fontSize:"100%",color:"black"},children:r}),Object(X.jsx)(pe.a,{variant:"body2",sx:{fontSize:"60%",color:"gray"},children:n.toUpperCase()})]})}}]),n}(r.Component);function je(e){var t=e.groupTableIndex,n=e.activeMapColorTableName,r=K.getValueKeys(K.getFirstRow(t)),a=j.c.toTitleCase(n.split(".")[1]);return Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"subtitle1",component:"div",children:a}),Object(X.jsx)(oe.a,{sx:{position:"absolute",top:100,bottom:20,width:560},children:Object(X.jsxs)(ce.a,{stickyHeader:!0,padding:"none",children:[Object(X.jsx)(se.a,{children:Object(X.jsxs)(le.a,{children:[Object(X.jsx)(ie.a,{align:"right",width:"5"}),Object(X.jsx)(ie.a,{align:"right",width:"80"}),r.map((function(e){return Object(X.jsx)(be,{valueKey:e})}))]})}),Object(X.jsx)(ue.a,{children:Object.entries(t).map((function(e,t){var n=Object(d.a)(e,2),a=n[0],c=n[1],u=K.getValueSum(c),i=K.getMaxValueKey(c);return Object(X.jsxs)(le.a,{children:[Object(X.jsx)(ie.a,{children:Object(X.jsx)(pe.a,{variant:"caption",children:"".concat(t+1,".")})}),Object(X.jsx)(ie.a,{children:Object(X.jsx)(de,{regionID:a})}),r.map((function(e){var t=i===e;return Object(X.jsx)(fe,{value:c[e],valueSum:u,valueKey:e,isMax:t},a+"-"+e)}))]},a)}))})]})})]})}function ve(e){var t=e.region,n=e.title;return Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"h5",children:k.number(t.pop)}),Object(X.jsx)(pe.a,{variant:"h7",children:t.groupID}),Object(X.jsx)(pe.a,{variant:"caption",children:n})]},t.groupID)}function he(e){var t=e.popList,n=e.pCorrect,r=T.mean(t),a=r/(1+n),c=r*(1+n),u=t.filter((function(e){return a<=e&&c>=e})).length,i=t.length;return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"h5",display:"inline",children:k.percent(u,i)}),Object(X.jsx)(pe.a,{variant:"h7",display:"inline",children:" "+u})]}),Object(X.jsxs)(pe.a,{variant:"caption",children:["Regions within ",k.percent(n,1)," of Mean Population (",k.number(a)," to ",k.number(c),")"]})]})}function ge(e){var t=e.groupToRegions,n=e.tableIndexIndex["regions.2012_census.ethnicity_of_population"],r=Object.keys(t).length,a=Object.entries(t).map((function(e){var t=Object(d.a)(e,2),r=t[0],a=t[1];return{groupID:r,pop:j.b.sum(a.map((function(e){return n[e]?parseInt(n[e].total_population):0})))}})).sort((function(e,t){return e.pop-t.pop})),c=a[0],u=a[r-1],i=a.map((function(e){return e.pop})),o=T.mean(i),s=T.stdev(i);return Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"h5",children:r}),Object(X.jsx)(pe.a,{variant:"caption",children:"Number of Regions"}),Object(X.jsxs)($.a,{sx:{p:2},children:[Object(X.jsx)(pe.a,{variant:"h4",children:"Population Balance"}),Object(X.jsxs)(ee.a,{children:[Object(X.jsx)(pe.a,{variant:"h5",display:"inline",children:k.number(o)}),Object(X.jsx)(pe.a,{variant:"h7",display:"inline",children:" \xb1 "+k.number(2*s)})]}),Object(X.jsx)(pe.a,{variant:"caption",children:"Mean Population \xb1 3 Standard Deviations"}),Object(X.jsx)(ve,{title:"Smallest Region",region:c}),Object(X.jsx)(ve,{title:"Largest Region",region:u}),Object(X.jsx)(ee.a,{children:Object(X.jsx)(pe.a,{variant:"h5",display:"inline",children:(u.pop/c.pop).toPrecision(2)+" : 1"})}),Object(X.jsx)(pe.a,{variant:"caption",children:"Largest : Smallest"}),Object(X.jsx)(he,{popList:i,pCorrect:.1}),Object(X.jsx)(he,{popList:i,pCorrect:.2}),Object(X.jsx)(he,{popList:i,pCorrect:.4})]})]})}var Oe={MAP_PROPS:"Map Properties",DATA:"Data"},xe=Oe.MAP_PROPS,me=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={activeTab:xe},r}return Object(p.a)(n,[{key:"onTabChange",value:function(e,t){this.setState({activeTab:t})}},{key:"render",value:function(){var e=this.props,t=e.groupToRegions,n=e.groupTableIndex,r=e.activeMapColorTableName,a=e.tableIndexIndex,c=this.state.activeTab;return Object(X.jsx)($.a,{sx:{position:"absolute",top:20,right:20,bottom:20,width:600,zIndex:1e3},children:Object(X.jsxs)(ne.a,{value:c,children:[Object(X.jsx)(ee.a,{sx:{borderBottom:1,borderColor:"divider"},children:Object(X.jsx)(re.a,{onChange:this.onTabChange.bind(this),"aria-label":"lab API tabs example",children:Object.values(Oe).map((function(e){return Object(X.jsx)(te.a,{label:e,value:e},e)}))})}),Object(X.jsx)(ae.a,{value:Oe.MAP_PROPS,children:Object(X.jsx)(ge,{groupToRegions:t,tableIndexIndex:a})}),Object(X.jsx)(ae.a,{value:Oe.DATA,children:Object(X.jsx)(je,{groupToRegions:t,groupTableIndex:n,activeMapColorTableName:r})})]})})}}]),n}(r.Component),ye=n(40),Ie=n(238),ke=n(51),Te=n(124),Ce=n(95);function we(e,t){var n=Object(d.a)(e,2),r=n[0],a=n[1],c=0;for(var u in t){var i=(u-1+t.length)%t.length,o=Object(d.a)(t[u],2),s=o[0],l=o[1],p=Object(d.a)(t[i],2),b=p[0],f=p[1];l>r!==f>r&&a<(b-s)*(r-l)/(f-l)+s&&(c+=1)}return c%2===1}function De(e,t){for(var n in t){var r=t[n];for(var a in r){if(we(e,r[a]))return!0}}return!1}var Me=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getCoordinatesForRegion",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=H.getEntType(t),r="/".concat(m,"/data/geo/").concat(n,"/").concat(t,".json"),e.next=4,j.d.json(r);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getRegionToGeo",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(n.map(function(){var t=Object(s.a)(o.a.mark((function t(n){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getCoordinatesForRegion(n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 2:return r=t.sent,t.abrupt("return",n.reduce((function(e,t,n){return e[t]=r[n],e}),{}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"getRegionTree",value:function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="/".concat(m,"/data/geo/region_tree.json"),e.next=3,j.d.json(t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"isPointInRegion",value:function(){var t=Object(s.a)(o.a.mark((function t(n,r){var a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getCoordinatesForRegion(r);case 2:return a=t.sent,t.abrupt("return",De(n,a));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"getRegionsForPoint",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r,a,c,u,i,s,l,p;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getRegionTree();case 2:r=t.sent,a={},t.t0=o.a.keys(U);case 5:if((t.t1=t.t0()).done){t.next=24;break}c=t.t1.value,u=U[c],i=Object.keys(r),s=!1,t.t2=o.a.keys(i);case 11:if((t.t3=t.t2()).done){t.next=20;break}return l=t.t3.value,p=i[l],t.next=16,e.isPointInRegion(n,p);case 16:t.sent&&(a[u]=p,r=r[p],s=!0),t.next=11;break;case 20:if(s){t.next=22;break}return t.abrupt("break",24);case 22:t.next=5;break;case 24:return t.abrupt("return",a);case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),e}();var Se=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getGroupGeoJSONNoCache",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Me.getCoordinatesForRegion(t);case 2:return e.t0=e.sent,e.abrupt("return",{type:"MultiPolygon",coordinates:e.t0});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return n=e.sent,r=Te.a(n),r=Ce.a(r),r=Ce.b(r,1e-7),a=ke.b(r,Object.values(r.objects)),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getGroupGeoJSON",value:function(){var t=Object(s.a)(o.a.mark((function t(n){var r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.join(":")+"v5",t.next=3,C.get(r,Object(s.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getGroupGeoJSONNoCache(n);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),e}(),Ne="white",Re=function(){function e(){Object(l.a)(this,e)}return Object(p.a)(e,null,[{key:"getRegionStyle",value:function(e){var t=.1,n="gray";if(!e)return{fillColor:n,fillOpacity:t,color:Ne,weight:1};var r=K.getMaxValueKey(e);return t=K.getValueKeyP(e,r),{fillColor:n=K.getTableRowColor(e),fillOpacity:t,color:Ne,weight:1}}}]),e}();function Le(e){var t=e.groupTableRow,n=K.getValueSum(t),r=K.getValueEntriesSortedByValue(t);return r.push(["TOTAL",n]),Object(X.jsx)(ee.a,{sx:{width:200},children:Object(X.jsx)(oe.a,{children:Object(X.jsx)(ce.a,{stickyHeader:!0,padding:"none",children:Object(X.jsx)(ue.a,{children:r.map((function(e,t){var r=Object(d.a)(e,2),a=r[0],c=r[1];return 0===c?null:Object(X.jsxs)(le.a,{children:[Object(X.jsx)(be,{valueKey:a}),Object(X.jsx)(fe,{value:c,valueSum:n,valueKey:a})]},a)}))})})})})}var Pe=n(251),_e=n(237),Ee=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"render",value:function(){var e=this.props,t=e.geoJSON,n=e.style,r=e.center,a=e.radius,c=e.renderedPopup,u=e.showDorlingCartogram,i=u?Object(X.jsx)(Pe.a,{center:r,radius:a,pathOptions:n,children:c}):null,o=u?{fillColor:n.fillColor,fillOpacity:n.fillOpacity/5,color:"rgba(0,0,0,0.2)",weight:n.weight}:n;return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsx)(_e.a,{data:t,style:o,onEachFeature:function(e,t){t.on({click:function(e){console.debug("Not implemented")}})},children:c}),i]})}}]),n}(r.Component);function Ae(e){return 20*Math.sqrt(e)}var Ve=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={groupGeoJSONList:null},r.isComponentMounted=!1,r}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isComponentMounted=!0,t=this.props.groupToRegions,e.next=4,Promise.all(Object.entries(t).map(function(){var e=Object(s.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(d.a)(t,2),n[0],r=n[1],e.next=3,Se.getGroupGeoJSON(r);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:n=e.sent,this.isComponentMounted&&this.setState({groupGeoJSONList:n});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.groupGeoJSONList;if(!e)return null;var t,n=this.props,r=n.groupToRegions,a=n.groupTableIndex,c=n.showDorlingCartogram,u=Object.keys(r),i=e.map((function(e){var t=ye.e(e),n=Object(d.a)(t,2);return e.y=n[0],e.x=n[1],e})),o=u.map((function(e){return K.getValueSum(a[e])}));if(c){for(var s=ye.b(i).force("x",ye.c((function(e){return ye.e(e)[1]}))).force("y",ye.d((function(e){return ye.e(e)[0]}))).force("collide",ye.a((function(e,t){return 1015e-8*Ae(o[t])}))).stop(),l=0;l<80;l++)s.tick();t=s.nodes()}return Object.entries(r).map((function(n,r){var u,i=Object(d.a)(n,2),o=i[0],s=i[1],l=a[o],p=Ae(K.getValueSum(l));c&&(u=[t[r].x,t[r].y]);var b=Object(X.jsxs)(Ie.a,{children:[Object(X.jsx)(ee.a,{style:{fontSize:24},children:Object(X.jsx)(de,{regionID:o})}),Object(X.jsx)(Le,{groupTableRow:l})]}),f=Re.getRegionStyle(l);return Object(X.jsx)(Ee,{geoJSON:e[r],style:f,renderedPopup:b,showDorlingCartogram:c,radius:p,center:u},"group-".concat(s[0]))}))}}]),n}(r.Component),Ke=n(256),Fe=n(255),Ge=n(252),Ue=n(253),Be=n(254),Je=n(122),He=n.n(Je);function ze(e){var t=e.activeMapID,n=e.onClickMap,r=e.mapInfoIndex;return Object(X.jsx)($.a,{sx:{position:"absolute",zIndex:1e3,left:20,top:20,width:200,height:300},children:Object(X.jsx)(Fe.a,{dense:!0,subheader:Object(X.jsx)(Ke.a,{children:"Split Regions by"}),children:Object.keys(r).map((function(e){var r=t===e;return Object(X.jsxs)(Ge.a,{selected:r,onClick:function(){n(e)},children:[Object(X.jsx)(Ue.a,{children:Object(X.jsx)(He.a,{})}),Object(X.jsx)(Be.a,{primary:H.getEntTypeLongName(e)})]},e)}))})})}var We=n(33),Ye=n(258),qe=n(257),Qe=n(241),Xe=n(243),Ze={position:"absolute",zIndex:1e3,left:20,bottom:20,width:300,height:420,overflow:"scroll"};function $e(e){var t=e.showDorlingCartogram,n=e.onChangeDorlingCartogram,r="Dorling Cartogram (".concat(t?"ON":"OFF",")");return Object(X.jsx)(qe.a,{sx:{marginLeft:2},children:Object(X.jsx)(Ye.a,{label:Object(X.jsx)(pe.a,{variant:"caption",children:r}),disableTypography:!0,control:Object(X.jsx)(Xe.a,{checked:t,onChange:n})})})}function et(e){var t=e.tableInfo,n=e.activeMapColorTableName,r=e.onClickMapColor,a=t.getLabel,c=t.getTableName,u=t.configList,i=t.Icon,o=u[u.length-1],s=u.map((function(e){return{value:e}}));function l(e){var t=s.findIndex((function(t){return t.value>=e}));return s[t].value}var p,b=!1,f=o,d=Object(We.a)(u);try{for(d.s();!(p=d.n()).done;){var j=p.value;if(c(j)===n){b=!0,f=j;break}}}catch(g){d.e(g)}finally{d.f()}var v=a(f),h=u.length>1;return Object(X.jsxs)(ee.a,{children:[Object(X.jsxs)(Ge.a,{selected:b,onClick:function(){var e=c(o);r(e)},children:[Object(X.jsx)(Ue.a,{children:Object(X.jsx)(i,{})}),Object(X.jsx)(Be.a,{primary:v})]},v),h?Object(X.jsx)(Qe.a,{valueLabelDisplay:"auto",disabled:!b,marks:s,value:f,min:u[0],max:o,valueLabelFormat:l,onChange:function(e){var t=l(e.target.value),n=c(t);r(n)},sx:{marginLeft:"10%",marginRight:"10%",width:"80%",color:"black"}}):null]})}function tt(e){var t=e.activeMapColorTableName,n=e.onClickMapColor,r=e.showDorlingCartogram,a=e.onClickShowDorlingCartogram,c=e.onClickHideDorlingCartogram;return Object(X.jsxs)($.a,{sx:Ze,children:[Object(X.jsx)($e,{showDorlingCartogram:r,onChangeDorlingCartogram:function(e){e.target.checked?a():c()}}),Object(X.jsx)(Fe.a,{dense:!0,subheader:Object(X.jsx)(Ke.a,{children:"Color Map by"}),children:L.map((function(e,r){return Object(X.jsx)(et,{tableInfo:e,activeMapColorTableName:t,onClickMapColor:n},"list-item-"+r)}))})]})}var nt=[7.9,81.5],rt=G.PROVINCE,at=function(e){Object(b.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).state={activeMapID:rt,mapInfoIndex:void 0,groupIndex:void 0,activeGroupID:void 0,tableIndexIndex:void 0,activeMapColorTableName:_,showDorlingCartogram:!1},r}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state,n=t.activeMapID,r=t.activeMapColorTableName,e.next=3,this.updateMap(n,r);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"updateMap",value:function(){var e=Object(s.a)(o.a.mark((function e(t,n){var r,a,c,u,i,s,l,p;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=this.state.mapInfoIndex){e.next=5;break}return e.next=4,W.getMapInfoIndex();case 4:r=e.sent;case 5:if(a=this.state.tableIndexIndex){e.next=10;break}return e.next=9,K.getTableIndexIndex();case 9:a=e.sent;case 10:c=r[t],u=c.groupIndex,i=c.groupToRegions,s=Object.keys(u)[0],l=a[n],p=W.getGroupTableIndex(i,l),this.setState({activeMapID:t,activeMapColorTableName:n,mapInfoIndex:r,groupIndex:u,groupToRegions:i,activeGroupID:s,tableIndexIndex:a,activeTableIndex:l,groupTableIndex:p});case 15:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"onClickMapColor",value:function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.updateMap(this.state.activeMapID,t);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onClickMap",value:function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.updateMap(t,this.state.activeMapColorTableName);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onClickShowDorlingCartogram",value:function(){this.setState({showDorlingCartogram:!0})}},{key:"onClickHideDorlingCartogram",value:function(){this.setState({showDorlingCartogram:!1})}},{key:"render",value:function(){var e=this.state.groupIndex;if(!e)return"Loading...";var t=this.state,n=t.groupToRegions,r=t.activeGroupID,a=t.mapInfoIndex,c=t.tableIndexIndex,u=t.activeMapColorTableName,i=t.activeMapID,o=t.activeTableIndex,s=t.groupTableIndex,l=t.showDorlingCartogram;return Object(X.jsxs)("div",{children:[Object(X.jsx)(Z,{center:nt,zoom:8,children:Object(X.jsx)(Ve,{groupToRegions:n,activeGroupID:r,groupTableIndex:s,showDorlingCartogram:l},"multi-region-view-".concat(i,"-").concat(l))}),Object(X.jsx)(ze,{activeMapID:i,onClickMap:this.onClickMap.bind(this),mapInfoIndex:a}),Object(X.jsx)(tt,{activeMapColorTableName:u,onClickMapColor:this.onClickMapColor.bind(this),showDorlingCartogram:l,onClickShowDorlingCartogram:this.onClickShowDorlingCartogram.bind(this),onClickHideDorlingCartogram:this.onClickHideDorlingCartogram.bind(this)}),Object(X.jsx)(me,{groupIndex:e,groupToRegions:n,activeGroupID:r,activeTableIndex:o,activeMapColorTableName:u,tableIndexIndex:c,groupTableIndex:s})]})}}]),n}(r.Component),ct=n(123),ut=n(244),it=Object(ct.a)({typography:{fontFamily:["Raleway","sans-serif"].join(",")}});var ot=function(){return Object(X.jsx)(ut.a,{theme:it,children:Object(X.jsx)(at,{})})},st=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,265)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,u=t.getTTFB;n(e),r(e),a(e),c(e),u(e)}))};u.a.render(Object(X.jsx)(a.a.StrictMode,{children:Object(X.jsx)(ot,{})}),document.getElementById("root")),st()}},[[203,1,2]]]);
//# sourceMappingURL=main.69b544f2.chunk.js.map