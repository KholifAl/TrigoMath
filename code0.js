gdjs.MainMenuCode = {};
gdjs.MainMenuCode.localVariables = [];
gdjs.MainMenuCode.GDNewSpriteObjects1= [];
gdjs.MainMenuCode.GDNewSpriteObjects2= [];
gdjs.MainMenuCode.GDExitObjects1= [];
gdjs.MainMenuCode.GDExitObjects2= [];
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects1= [];
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects2= [];
gdjs.MainMenuCode.GDNewSprite3Objects1= [];
gdjs.MainMenuCode.GDNewSprite3Objects2= [];
gdjs.MainMenuCode.GDBackgroundObjects1= [];
gdjs.MainMenuCode.GDBackgroundObjects2= [];
gdjs.MainMenuCode.GDMulaiObjects1= [];
gdjs.MainMenuCode.GDMulaiObjects2= [];
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects1= [];
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects2= [];
gdjs.MainMenuCode.GDTransitionObjects1= [];
gdjs.MainMenuCode.GDTransitionObjects2= [];


gdjs.MainMenuCode.asyncCallback20580276 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.MainMenuCode.localVariables);
gdjs.MainMenuCode.localVariables.length = 0;
}
gdjs.MainMenuCode.eventsList0 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.MainMenuCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.MainMenuCode.asyncCallback20580276(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.MainMenuCode.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Mulai"), gdjs.MainMenuCode.GDMulaiObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MainMenuCode.GDMulaiObjects1.length;i<l;++i) {
    if ( gdjs.MainMenuCode.GDMulaiObjects1[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MainMenuCode.GDMulaiObjects1[k] = gdjs.MainMenuCode.GDMulaiObjects1[i];
        ++k;
    }
}
gdjs.MainMenuCode.GDMulaiObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.MainMenuCode.GDTransitionObjects1);
{for(var i = 0, len = gdjs.MainMenuCode.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.MainMenuCode.GDTransitionObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.MainMenuCode.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.MainMenuCode.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 1, "Circular", "Forward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Perpus", false);
}
{ //Subevents
gdjs.MainMenuCode.eventsList0(runtimeScene);} //End of subevents
}

}


};

gdjs.MainMenuCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.MainMenuCode.GDNewSpriteObjects1.length = 0;
gdjs.MainMenuCode.GDNewSpriteObjects2.length = 0;
gdjs.MainMenuCode.GDExitObjects1.length = 0;
gdjs.MainMenuCode.GDExitObjects2.length = 0;
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects1.length = 0;
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects2.length = 0;
gdjs.MainMenuCode.GDNewSprite3Objects1.length = 0;
gdjs.MainMenuCode.GDNewSprite3Objects2.length = 0;
gdjs.MainMenuCode.GDBackgroundObjects1.length = 0;
gdjs.MainMenuCode.GDBackgroundObjects2.length = 0;
gdjs.MainMenuCode.GDMulaiObjects1.length = 0;
gdjs.MainMenuCode.GDMulaiObjects2.length = 0;
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects1.length = 0;
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects2.length = 0;
gdjs.MainMenuCode.GDTransitionObjects1.length = 0;
gdjs.MainMenuCode.GDTransitionObjects2.length = 0;

gdjs.MainMenuCode.eventsList1(runtimeScene);
gdjs.MainMenuCode.GDNewSpriteObjects1.length = 0;
gdjs.MainMenuCode.GDNewSpriteObjects2.length = 0;
gdjs.MainMenuCode.GDExitObjects1.length = 0;
gdjs.MainMenuCode.GDExitObjects2.length = 0;
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects1.length = 0;
gdjs.MainMenuCode.GDPetunjuk_9595PermainanObjects2.length = 0;
gdjs.MainMenuCode.GDNewSprite3Objects1.length = 0;
gdjs.MainMenuCode.GDNewSprite3Objects2.length = 0;
gdjs.MainMenuCode.GDBackgroundObjects1.length = 0;
gdjs.MainMenuCode.GDBackgroundObjects2.length = 0;
gdjs.MainMenuCode.GDMulaiObjects1.length = 0;
gdjs.MainMenuCode.GDMulaiObjects2.length = 0;
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects1.length = 0;
gdjs.MainMenuCode.GDMedievalButtonBeigeObjects2.length = 0;
gdjs.MainMenuCode.GDTransitionObjects1.length = 0;
gdjs.MainMenuCode.GDTransitionObjects2.length = 0;


return;

}

gdjs['MainMenuCode'] = gdjs.MainMenuCode;
