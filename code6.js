gdjs.Pet_95Lvl1Code = {};
gdjs.Pet_95Lvl1Code.localVariables = [];
gdjs.Pet_95Lvl1Code.GDBackgroundObjects1= [];
gdjs.Pet_95Lvl1Code.GDBackgroundObjects2= [];
gdjs.Pet_95Lvl1Code.GDBackgroundObjects3= [];
gdjs.Pet_95Lvl1Code.GDNewTextObjects1= [];
gdjs.Pet_95Lvl1Code.GDNewTextObjects2= [];
gdjs.Pet_95Lvl1Code.GDNewTextObjects3= [];
gdjs.Pet_95Lvl1Code.GDNextObjects1= [];
gdjs.Pet_95Lvl1Code.GDNextObjects2= [];
gdjs.Pet_95Lvl1Code.GDNextObjects3= [];
gdjs.Pet_95Lvl1Code.GDBackObjects1= [];
gdjs.Pet_95Lvl1Code.GDBackObjects2= [];
gdjs.Pet_95Lvl1Code.GDBackObjects3= [];
gdjs.Pet_95Lvl1Code.GDcekObjects1= [];
gdjs.Pet_95Lvl1Code.GDcekObjects2= [];
gdjs.Pet_95Lvl1Code.GDcekObjects3= [];
gdjs.Pet_95Lvl1Code.GDcek2Objects1= [];
gdjs.Pet_95Lvl1Code.GDcek2Objects2= [];
gdjs.Pet_95Lvl1Code.GDcek2Objects3= [];
gdjs.Pet_95Lvl1Code.GDTransitionObjects1= [];
gdjs.Pet_95Lvl1Code.GDTransitionObjects2= [];
gdjs.Pet_95Lvl1Code.GDTransitionObjects3= [];


gdjs.Pet_95Lvl1Code.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !runtimeScene.getScene().getVariables().getFromIndex(2).getAsBoolean();
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).add(1280);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getScene().getVariables().getFromIndex(2).getAsBoolean();
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Level1", false);
}}

}


};gdjs.Pet_95Lvl1Code.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
}

}


};gdjs.Pet_95Lvl1Code.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Back"), gdjs.Pet_95Lvl1Code.GDBackObjects1);
gdjs.copyArray(runtimeScene.getObjects("Next"), gdjs.Pet_95Lvl1Code.GDNextObjects1);
gdjs.copyArray(runtimeScene.getObjects("cek"), gdjs.Pet_95Lvl1Code.GDcekObjects1);
gdjs.copyArray(runtimeScene.getObjects("cek2"), gdjs.Pet_95Lvl1Code.GDcek2Objects1);
{gdjs.evtTools.tween.tweenCamera2(runtimeScene, "maju", 640 + runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber(), gdjs.evtTools.camera.getCameraY(runtimeScene, "", 0), "", "swingTo", 0.6);
}{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDcekObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDcekObjects1[i].getBehavior("Text").setText(runtimeScene.getScene().getVariables().getFromIndex(0).getAsString());
}
}{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDcek2Objects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDcek2Objects1[i].getBehavior("Text").setText(runtimeScene.getScene().getVariables().getFromIndex(1).getAsString());
}
}{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDNextObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDNextObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDBackObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDBackObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDNextObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDNextObjects1[i].SetLabelText("Next", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{runtimeScene.getScene().getVariables().getFromIndex(2).setBoolean(false);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() >= runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber());
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Next"), gdjs.Pet_95Lvl1Code.GDNextObjects1);
{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDNextObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDNextObjects1[i].SetLabelText("Mulai", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{runtimeScene.getScene().getVariables().getFromIndex(2).setBoolean(true);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() == 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Back"), gdjs.Pet_95Lvl1Code.GDBackObjects1);
{for(var i = 0, len = gdjs.Pet_95Lvl1Code.GDBackObjects1.length ;i < len;++i) {
    gdjs.Pet_95Lvl1Code.GDBackObjects1[i].hide();
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21596772);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Background"), gdjs.Pet_95Lvl1Code.GDBackgroundObjects1);
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(0);
}{runtimeScene.getScene().getVariables().getFromIndex(1).setNumber((( gdjs.Pet_95Lvl1Code.GDBackgroundObjects1.length === 0 ) ? 0 :gdjs.Pet_95Lvl1Code.GDBackgroundObjects1[0].getWidth()) - 1280);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Next"), gdjs.Pet_95Lvl1Code.GDNextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Pet_95Lvl1Code.GDNextObjects1.length;i<l;++i) {
    if ( gdjs.Pet_95Lvl1Code.GDNextObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Pet_95Lvl1Code.GDNextObjects1[k] = gdjs.Pet_95Lvl1Code.GDNextObjects1[i];
        ++k;
    }
}
gdjs.Pet_95Lvl1Code.GDNextObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Pet_95Lvl1Code.eventsList0(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Back"), gdjs.Pet_95Lvl1Code.GDBackObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Pet_95Lvl1Code.GDBackObjects1.length;i<l;++i) {
    if ( gdjs.Pet_95Lvl1Code.GDBackObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Pet_95Lvl1Code.GDBackObjects1[k] = gdjs.Pet_95Lvl1Code.GDBackObjects1[i];
        ++k;
    }
}
gdjs.Pet_95Lvl1Code.GDBackObjects1.length = k;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).sub(1280);
}
{ //Subevents
gdjs.Pet_95Lvl1Code.eventsList1(runtimeScene);} //End of subevents
}

}


};

gdjs.Pet_95Lvl1Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Pet_95Lvl1Code.GDBackgroundObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDBackgroundObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDBackgroundObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects1.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects2.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects3.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects3.length = 0;

gdjs.Pet_95Lvl1Code.eventsList2(runtimeScene);
gdjs.Pet_95Lvl1Code.GDBackgroundObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDBackgroundObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDBackgroundObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDNewTextObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDNextObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDBackObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDcekObjects3.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects1.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects2.length = 0;
gdjs.Pet_95Lvl1Code.GDcek2Objects3.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects1.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects2.length = 0;
gdjs.Pet_95Lvl1Code.GDTransitionObjects3.length = 0;


return;

}

gdjs['Pet_95Lvl1Code'] = gdjs.Pet_95Lvl1Code;
