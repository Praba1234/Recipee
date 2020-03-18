describe("seacrh sample test level1",function(){
    it("array of strings",function(){
        var array   = ["varun","arun","run","un","name","Zoho","crm","lyte","utils",""];
        expect($L.search(array,undefined,"n").length).toBe(5);
        expect($L.search(array,undefined,"l").length).toBe(2);
        expect($L.search(array,undefined,"l","startsWith").length).toBe(1);
        expect($L.search(array,undefined,"n","startsWith").length).toBe(1);
        expect($L.search(array,"key","n","includes").length).toBe(0);
        expect($L.search(array,"","n","includes").length).toBe(5);
        expect($L.search([],undefined,"n","includes").length).toBe(0);
        expect($L.search(array,"","").length).toBe(1);
    });
    it("array of numbers",function(){
        var array = [ 123,1234,12,890,675,345];
        expect($L.search(array,undefined,123).length).toBe(2);
        expect($L.search(array,undefined,1234).length).toBe(1);
        expect($L.search(array,undefined,12).length).toBe(3);
        expect($L.search(array,undefined,675).length).toBe(1);
        expect($L.search(array,undefined,1).length).toBe(3);
    });
    it("array of numbers,strings and array",function(){
        var array = ["hello",123,"arun","5","785",345,"present",9487581633,"component",1344221,"",["zoho","crm"]];
        expect($L.search(array,"","r").length).toBe(3);
        expect($L.search(array,"","el").length).toBe(1);
        expect($L.search(array,"",3).length).toBe(4);
        expect($L.search(array,"","5").length).toBe(4);
        expect($L.search(array,"","8").length).toBe(2);
        expect($L.search(array,"","z").length).toBe(1);
    });
    it("array of objects level1",function(){
        var array = [ {name:"varun",id:11},{name:"afzal" ,id:2},{name:"MSD",id:3},{name:"vk",id:3},{name:"hit",id:4},{name:"default",id:5},
        {name:"cric",id:1},{name:"dinesh",id:34},{name:"dharun",id:89}]
        expect($L.search(array,"name","d").length).toBe(3);
        expect($L.search(array,"name","a").length).toBe(4);
        expect($L.search(array,"name","A").length).toBe(0);
        expect($L.search(array,"name","S").length).toBe(1);
        expect($L.search(array,"name","dharun").length).toBe(1);
        expect($L.search(array,"id",1).length).toBe(2);
        expect($L.search(array,"id",3).length).toBe(3);
        expect($L.search(array,"id",89).length).toBe(1);
    });
    it("array of objects level2",function(){
        var array = [ "hi","aaaaa","faf","abd","msd",[{name:"nayeem"},{name:"chris"},{name:" anticlimactical"}],{name:"machine",id:1},{name:"don",id:4},["hi","bbbb"]];
        expect($L.search(array,"name","mac").length).toBe(2)
        expect($L.search(array,undefined,"h").length).toBe(2);
        expect($L.search(array,undefined,"bbb").length).toBe(1);
        expect($L.search(array,undefined,"bbab").length).toBe(0);
        expect($L.search(array,"name","d").length).toBe(1);
        expect($L.search(array,"name","c","startsWith").length).toBe(1)
    });
    it("array of objects level3",function(){
        var array = [{crm:{name:"lyte"}},{zoho:{name:"lyte"}},{crm:{name:"id"}},{crm:{name:"html"}},{name:"lyte"},"lyte",["lyte"]]
        expect($L.search(array,"crm.name","l").length).toBe(2);
        expect($L.search(array,"crm.name","l","startsWith").length).toBe(1);
        expect($L.search(array,"crm.name","d").length).toBe(1);
        expect($L.search(array,"zoho.name","l").length).toBe(1);
        expect($L.search(array,"name","l").length).toBe(1);
        expect($L.search(array,undefined,"l").length).toBe(2);
    });
    it("array of object level4",function(){
        var array = [{zoho:{crm:"lyte"}},{zoho:[{crm:"lite"},{crm:"win"}]},[{zoho:{crm:"client"}},{zoho:{crm:"server"}},{zoho:{crm:"land"}}],{name:"lyte"},"lyte",["lyte"]]
        expect($L.search(array,"zoho.crm","l").length).toBe(3);
        expect($L.search(array,"zoho.crm","la").length).toBe(1);
        expect($L.search(array,"zoho.crm","c").length).toBe(1);
        expect($L.search(array,"name","l").length).toBe(1);
        expect($L.search(array,"zoho.crm","server").length).toBe(1);
        expect($L.search(array,undefined,"l").length).toBe(2);
    });
    it("array of object level5",function(){
        var array = [{zoho:[{crm:{name:"varun"}},{crm:{name:"giri"}}]},{zoho:[{crm:"lite"},{crm:""}]},[{zoho:{crm:"client"}},{zoho:{crm:""}},{zoho:{crm:"land"}}],123,{name:""},"lyte's's\n",["lyte"],[{zoho:[{crm:[{name:"security"},{name:"audits"},{name:"application"}]}]}],{zoho:{crm:{name:"source"}}},{zoho:{crm:{name:["elements","console","network"]}}}];
        expect($L.search(array,"zoho.crm.name","a").length).toBe(2);
        expect($L.search(array,"zoho.crm.name","giri").length).toBe(1);
        expect($L.search(array,"zoho.crm","").length).toBe(2);
        expect($L.search(array,"zoho.crm.name","s","startsWith").length).toBe(2);
    });
    it("searchType equals",function(){
        var array = [{zoho:[{crm:{name:"varun"}},{crm:{name:"giri"}}]},{zoho:[{crm:"lite"},{crm:""}]},[{zoho:{crm:"client"}},{zoho:{crm:""}},{zoho:{crm:"land"}}],123,{name:""},"lyte's's\n",["lyte"],[{zoho:[{crm:[{name:"security"},{name:"audits"},{name:"application"}]}]}],{zoho:{crm:{name:"source"}}},{zoho:{crm:{name:["elements","console","network"]}}}];
        expect($L.search(array,"zoho.crm.name","giri","equals").length).toBe(1);
        expect($L.search(array,"zoho.crm","land","equals").length).toBe(1);
        expect($L.search(array,"zoho.crm.name","console","equals").length).toBe(1);
        expect($L.search(array,"zoho.crm","lite","equals").length).toBe(1);
        expect($L.search(array,"zoho.crm.name","audits","equals").length).toBe(1);
    });
    it("searchType any",function(){
        var array = [ {name:"varun",id:11,mom:'yes'},{name:"afzal" ,id:2},{name:"MSD",id:3},{name:"vk",id:3},{name:"hit",id:4},{name:"default",id:5},
        {name:"cric",id:1,mom:'no'},{name:"dinesh",id:34},{name:"dharun",id:89}]
        expect($L.search(array,"mom","no","any").length).toBe(2);
        expect($L.search(array,"mom",undefined,"any").length).toBe(2);
        expect($L.search(array,"mom",'yes').length).toBe(1);
    });
    it("only Object",function(){
        var obj = {a:1,b:2,c:[{a:2,b:3,d:{ name : "abcdef"}}]};
        expect($L.search(obj,"c.d.name","","any").length).toBe(1);
        obj = {a:[1,2],b:{c:"name"},b:{c:"id"}}
        expect($L.search(obj,"b.c","id").length).toBe(1);
    });
    it("option argument check",function(){
        var array = [{ abc:'1',a:1,b:2,c:{abc:33}},{a:1},{c:{abc:1}},{c:{c:{abc:6}}}];
        expect($L.search(array,"abc","","any",{recursive : true , children : "c"}).length).toBe(4);
        array = {id:"1",name:"parent",children:[{id:"2",name:"aaa",children:[{id:"2",name:"aaaa","delete":true}]},{id:"2",name:"aaa",children:[{id:"2",name:"aaaa"},{id:"233",name:"aaaa","delete":true}]},{id:"1111",name:"cccc","delete":true,children:[{id:"22222",name:"rrrrr","delete":true}]}]}
        expect($L.search(array,"delete","","any",{recursive : true , children : "children"}).length).toBe(4);
        array = {id:"1",name:"parent",children:[{id:"2",name:"aaa",children:[{id:"2",name:"aaaa","delete":true}]},{id:"2",name:"aaa",children:[{id:"666",name:"aaaa","delete":true},{id:"233",name:"aaaa","delete":true}]},{id:"1111",name:"cccc","delete":true,children:[{id:"22222",name:"rrrrr","delete":true}]}]}
        expect($L.search(array,"delete","","any",{recursive : true , children : "children"}).length).toBe(5);
        array = {id:"1",name:"parent","delete":true,children:[{id:"2",name:"aaa",children:[{id:"2",name:"aaaa","delete":true}]},{id:"2",name:"aaa",children:[{id:"666",name:"aaaa","delete":true},{id:"233",name:"aaaa","delete":true}]},{id:"1111",name:"cccc","delete":true,children:[{id:"22222",name:"rrrrr","delete":true}]}]}
        expect($L.search(array,"delete","","any",{recursive : true , children : "children"}).length).toBe(6);
    });
});