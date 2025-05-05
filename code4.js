gdjs.Level2Code = {};
gdjs.Level2Code.localVariables = [];
gdjs.Level2Code.forEachIndex2 = 0;

gdjs.Level2Code.forEachObjects2 = [];

gdjs.Level2Code.forEachTemporary2 = null;

gdjs.Level2Code.forEachTotalCount2 = 0;

gdjs.Level2Code.GDDialogBoxdObjects1= [];
gdjs.Level2Code.GDDialogBoxdObjects2= [];
gdjs.Level2Code.GDDialogBoxdObjects3= [];
gdjs.Level2Code.GDDialogBoxdObjects4= [];
gdjs.Level2Code.GDNPCObjects1= [];
gdjs.Level2Code.GDNPCObjects2= [];
gdjs.Level2Code.GDNPCObjects3= [];
gdjs.Level2Code.GDNPCObjects4= [];
gdjs.Level2Code.GDTree1Objects1= [];
gdjs.Level2Code.GDTree1Objects2= [];
gdjs.Level2Code.GDTree1Objects3= [];
gdjs.Level2Code.GDTree1Objects4= [];
gdjs.Level2Code.GDTree2Objects1= [];
gdjs.Level2Code.GDTree2Objects2= [];
gdjs.Level2Code.GDTree2Objects3= [];
gdjs.Level2Code.GDTree2Objects4= [];
gdjs.Level2Code.GDBush1Objects1= [];
gdjs.Level2Code.GDBush1Objects2= [];
gdjs.Level2Code.GDBush1Objects3= [];
gdjs.Level2Code.GDBush1Objects4= [];
gdjs.Level2Code.GDHouse1Objects1= [];
gdjs.Level2Code.GDHouse1Objects2= [];
gdjs.Level2Code.GDHouse1Objects3= [];
gdjs.Level2Code.GDHouse1Objects4= [];
gdjs.Level2Code.GDHouse2Objects1= [];
gdjs.Level2Code.GDHouse2Objects2= [];
gdjs.Level2Code.GDHouse2Objects3= [];
gdjs.Level2Code.GDHouse2Objects4= [];
gdjs.Level2Code.GDEObjects1= [];
gdjs.Level2Code.GDEObjects2= [];
gdjs.Level2Code.GDEObjects3= [];
gdjs.Level2Code.GDEObjects4= [];
gdjs.Level2Code.GDE2Objects1= [];
gdjs.Level2Code.GDE2Objects2= [];
gdjs.Level2Code.GDE2Objects3= [];
gdjs.Level2Code.GDE2Objects4= [];
gdjs.Level2Code.GDShadedDarkJoystickObjects1= [];
gdjs.Level2Code.GDShadedDarkJoystickObjects2= [];
gdjs.Level2Code.GDShadedDarkJoystickObjects3= [];
gdjs.Level2Code.GDShadedDarkJoystickObjects4= [];
gdjs.Level2Code.GDTargetRoundButtonObjects1= [];
gdjs.Level2Code.GDTargetRoundButtonObjects2= [];
gdjs.Level2Code.GDTargetRoundButtonObjects3= [];
gdjs.Level2Code.GDTargetRoundButtonObjects4= [];
gdjs.Level2Code.GDTilemap_9595GroundObjects1= [];
gdjs.Level2Code.GDTilemap_9595GroundObjects2= [];
gdjs.Level2Code.GDTilemap_9595GroundObjects3= [];
gdjs.Level2Code.GDTilemap_9595GroundObjects4= [];
gdjs.Level2Code.GDTilemap_9595WaterObjects1= [];
gdjs.Level2Code.GDTilemap_9595WaterObjects2= [];
gdjs.Level2Code.GDTilemap_9595WaterObjects3= [];
gdjs.Level2Code.GDTilemap_9595WaterObjects4= [];
gdjs.Level2Code.GDCameraTargetObjects1= [];
gdjs.Level2Code.GDCameraTargetObjects2= [];
gdjs.Level2Code.GDCameraTargetObjects3= [];
gdjs.Level2Code.GDCameraTargetObjects4= [];
gdjs.Level2Code.GDPortalObjects1= [];
gdjs.Level2Code.GDPortalObjects2= [];
gdjs.Level2Code.GDPortalObjects3= [];
gdjs.Level2Code.GDPortalObjects4= [];
gdjs.Level2Code.GDPlayerObjects1= [];
gdjs.Level2Code.GDPlayerObjects2= [];
gdjs.Level2Code.GDPlayerObjects3= [];
gdjs.Level2Code.GDPlayerObjects4= [];
gdjs.Level2Code.GDEnemyObjects1= [];
gdjs.Level2Code.GDEnemyObjects2= [];
gdjs.Level2Code.GDEnemyObjects3= [];
gdjs.Level2Code.GDEnemyObjects4= [];
gdjs.Level2Code.GDDebugTextObjects1= [];
gdjs.Level2Code.GDDebugTextObjects2= [];
gdjs.Level2Code.GDDebugTextObjects3= [];
gdjs.Level2Code.GDDebugTextObjects4= [];
gdjs.Level2Code.GDyesObjects1= [];
gdjs.Level2Code.GDyesObjects2= [];
gdjs.Level2Code.GDyesObjects3= [];
gdjs.Level2Code.GDyesObjects4= [];
gdjs.Level2Code.GDNewSpriteObjects1= [];
gdjs.Level2Code.GDNewSpriteObjects2= [];
gdjs.Level2Code.GDNewSpriteObjects3= [];
gdjs.Level2Code.GDNewSpriteObjects4= [];
gdjs.Level2Code.GDtrwwwObjects1= [];
gdjs.Level2Code.GDtrwwwObjects2= [];
gdjs.Level2Code.GDtrwwwObjects3= [];
gdjs.Level2Code.GDtrwwwObjects4= [];
gdjs.Level2Code.GDTransitionObjects1= [];
gdjs.Level2Code.GDTransitionObjects2= [];
gdjs.Level2Code.GDTransitionObjects3= [];
gdjs.Level2Code.GDTransitionObjects4= [];


gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects = Hashtable.newFrom({"Enemy": gdjs.Level2Code.GDEnemyObjects2});
gdjs.Level2Code.eventsList0 = function(runtimeScene) {

};gdjs.Level2Code.eventsList1 = function(runtimeScene) {

{


const repeatCount2 = 10;
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {
gdjs.copyArray(gdjs.Level2Code.GDEnemyObjects1, gdjs.Level2Code.GDEnemyObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() <= runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber());
}
if (isConditionTrue_0)
{
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects, gdjs.randomInRange(100, 1000), gdjs.randomInRange(50, 600), "");
}{runtimeScene.getScene().getVariables().getFromIndex(0).add(1);
}}
}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDTree1Objects1ObjectsGDgdjs_9546Level2Code_9546GDBush1Objects1ObjectsGDgdjs_9546Level2Code_9546GDTree2Objects1ObjectsGDgdjs_9546Level2Code_9546GDHouse1Objects1ObjectsGDgdjs_9546Level2Code_9546GDHouse2Objects1ObjectsGDgdjs_9546Level2Code_9546GDNPCObjects1ObjectsGDgdjs_9546Level2Code_9546GDTilemap_95959595GroundObjects1ObjectsGDgdjs_9546Level2Code_9546GDTilemap_95959595WaterObjects1ObjectsGDgdjs_9546Level2Code_9546GDEnemyObjects1ObjectsGDgdjs_9546Level2Code_9546GDyesObjects1Objects = Hashtable.newFrom({"Tree1": gdjs.Level2Code.GDTree1Objects1, "Bush1": gdjs.Level2Code.GDBush1Objects1, "Tree2": gdjs.Level2Code.GDTree2Objects1, "House1": gdjs.Level2Code.GDHouse1Objects1, "House2": gdjs.Level2Code.GDHouse2Objects1, "NPC": gdjs.Level2Code.GDNPCObjects1, "Tilemap_Ground": gdjs.Level2Code.GDTilemap_9595GroundObjects1, "Tilemap_Water": gdjs.Level2Code.GDTilemap_9595WaterObjects1, "Enemy": gdjs.Level2Code.GDEnemyObjects1, "yes": gdjs.Level2Code.GDyesObjects1});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects2Objects = Hashtable.newFrom({"Player": gdjs.Level2Code.GDPlayerObjects2});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDNPCObjects2Objects = Hashtable.newFrom({"NPC": gdjs.Level2Code.GDNPCObjects2});
gdjs.Level2Code.asyncCallback21390684 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Level2Code.localVariables);
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "Battle");
}gdjs.Level2Code.localVariables.length = 0;
}
gdjs.Level2Code.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Level2Code.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1.25), (runtimeScene) => (gdjs.Level2Code.asyncCallback21390684(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.Level2Code.eventsList3 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Level2Code.GDDialogBoxdObjects2, gdjs.Level2Code.GDDialogBoxdObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDDialogBoxdObjects3.length;i<l;++i) {
    if ( gdjs.Level2Code.GDDialogBoxdObjects3[i].IsYesClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDDialogBoxdObjects3[k] = gdjs.Level2Code.GDDialogBoxdObjects3[i];
        ++k;
    }
}
gdjs.Level2Code.GDDialogBoxdObjects3.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.Level2Code.GDTransitionObjects3);
{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects3.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects3[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects3.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects3[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 1, "Circular", "Forward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.Level2Code.eventsList2(runtimeScene);} //End of subevents
}

}


{

/* Reuse gdjs.Level2Code.GDDialogBoxdObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDDialogBoxdObjects2.length;i<l;++i) {
    if ( gdjs.Level2Code.GDDialogBoxdObjects2[i].IsNoClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDDialogBoxdObjects2[k] = gdjs.Level2Code.GDDialogBoxdObjects2[i];
        ++k;
    }
}
gdjs.Level2Code.GDDialogBoxdObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDDialogBoxdObjects2 */
gdjs.copyArray(runtimeScene.getObjects("E"), gdjs.Level2Code.GDEObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects2);
{for(var i = 0, len = gdjs.Level2Code.GDDialogBoxdObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDDialogBoxdObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.Level2Code.GDEObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDEObjects2[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDPlayerObjects2[i].activateBehavior("TopDownMovement", true);
}
}}

}


};gdjs.Level2Code.eventsList4 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("NPC"), gdjs.Level2Code.GDNPCObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "e");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtsExt__SpriteMultitouchJoystick__IsButtonPressed.func(runtimeScene, 1, "A", (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21388020);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.distanceTest(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects2Objects, gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDNPCObjects2Objects, 20, false);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("DialogBoxd"), gdjs.Level2Code.GDDialogBoxdObjects2);
gdjs.copyArray(runtimeScene.getObjects("E"), gdjs.Level2Code.GDEObjects2);
/* Reuse gdjs.Level2Code.GDPlayerObjects2 */
{for(var i = 0, len = gdjs.Level2Code.GDDialogBoxdObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDDialogBoxdObjects2[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDEObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDEObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.Level2Code.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDPlayerObjects2[i].activateBehavior("TopDownMovement", false);
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "Talk.wav", false, 50, 1);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("DialogBoxd"), gdjs.Level2Code.GDDialogBoxdObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDDialogBoxdObjects2.length;i<l;++i) {
    if ( gdjs.Level2Code.GDDialogBoxdObjects2[i].isVisible() ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDDialogBoxdObjects2[k] = gdjs.Level2Code.GDDialogBoxdObjects2[i];
        ++k;
    }
}
gdjs.Level2Code.GDDialogBoxdObjects2.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Level2Code.eventsList3(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustResumed(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("DialogBoxd"), gdjs.Level2Code.GDDialogBoxdObjects1);
gdjs.copyArray(runtimeScene.getObjects("E"), gdjs.Level2Code.GDEObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.Level2Code.GDTransitionObjects1);
{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Level2Code.GDDialogBoxdObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDDialogBoxdObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Level2Code.GDEObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDEObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDPlayerObjects1[i].activateBehavior("TopDownMovement", true);
}
}}

}


};gdjs.Level2Code.eventsList5 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.systemInfo.hasTouchScreen(runtimeScene));
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDShadedDarkJoystickObjects2 */
gdjs.copyArray(runtimeScene.getObjects("TargetRoundButton"), gdjs.Level2Code.GDTargetRoundButtonObjects2);
{for(var i = 0, len = gdjs.Level2Code.GDShadedDarkJoystickObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDShadedDarkJoystickObjects2[i].deleteFromScene(runtimeScene);
}
for(var i = 0, len = gdjs.Level2Code.GDTargetRoundButtonObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDTargetRoundButtonObjects2[i].deleteFromScene(runtimeScene);
}
}}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDDialogBoxdObjects2ObjectsGDgdjs_9546Level2Code_9546GDTargetRoundButtonObjects2Objects = Hashtable.newFrom({"DialogBoxd": gdjs.Level2Code.GDDialogBoxdObjects2, "TargetRoundButton": gdjs.Level2Code.GDTargetRoundButtonObjects2});
gdjs.Level2Code.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ShadedDarkJoystick"), gdjs.Level2Code.GDShadedDarkJoystickObjects2);
{for(var i = 0, len = gdjs.Level2Code.GDShadedDarkJoystickObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDShadedDarkJoystickObjects2[i].hide();
}
}{for(var i = 0, len = gdjs.Level2Code.GDShadedDarkJoystickObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDShadedDarkJoystickObjects2[i].ActivateControl(false, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.Level2Code.eventsList5(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("DialogBoxd"), gdjs.Level2Code.GDDialogBoxdObjects2);
gdjs.copyArray(runtimeScene.getObjects("TargetRoundButton"), gdjs.Level2Code.GDTargetRoundButtonObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.hasAnyTouchOrMouseStarted(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_1 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDDialogBoxdObjects2.length;i<l;++i) {
    if ( gdjs.Level2Code.GDDialogBoxdObjects2[i].isVisible() ) {
        isConditionTrue_1 = true;
        gdjs.Level2Code.GDDialogBoxdObjects2[k] = gdjs.Level2Code.GDDialogBoxdObjects2[i];
        ++k;
    }
}
gdjs.Level2Code.GDDialogBoxdObjects2.length = k;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDTargetRoundButtonObjects2.length;i<l;++i) {
    if ( gdjs.Level2Code.GDTargetRoundButtonObjects2[i].isVisible() ) {
        isConditionTrue_1 = true;
        gdjs.Level2Code.GDTargetRoundButtonObjects2[k] = gdjs.Level2Code.GDTargetRoundButtonObjects2[i];
        ++k;
    }
}
gdjs.Level2Code.GDTargetRoundButtonObjects2.length = k;
if (isConditionTrue_1) {
isConditionTrue_1 = false;
isConditionTrue_1 = gdjs.evtTools.input.cursorOnObject(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDDialogBoxdObjects2ObjectsGDgdjs_9546Level2Code_9546GDTargetRoundButtonObjects2Objects, runtimeScene, false, false);
}
isConditionTrue_0 = !isConditionTrue_1;
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ShadedDarkJoystick"), gdjs.Level2Code.GDShadedDarkJoystickObjects2);
{for(var i = 0, len = gdjs.Level2Code.GDShadedDarkJoystickObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDShadedDarkJoystickObjects2[i].TeleportAndPress((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


{


let isConditionTrue_0 = false;
{
}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Level2Code.GDPlayerObjects1});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPortalObjects1Objects = Hashtable.newFrom({"Portal": gdjs.Level2Code.GDPortalObjects1});
gdjs.Level2Code.asyncCallback21397356 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Level2Code.localVariables);
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}gdjs.Level2Code.localVariables.length = 0;
}
gdjs.Level2Code.eventsList7 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Level2Code.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.Level2Code.asyncCallback21397356(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects = Hashtable.newFrom({"Enemy": gdjs.Level2Code.GDEnemyObjects2});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects2Objects = Hashtable.newFrom({"Player": gdjs.Level2Code.GDPlayerObjects2});
gdjs.Level2Code.eventsList8 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Level2Code.GDEnemyObjects2, gdjs.Level2Code.GDEnemyObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDEnemyObjects3.length;i<l;++i) {
    if ( gdjs.Level2Code.GDEnemyObjects3[i].isCollidingWithPoint(runtimeScene.getScene().getVariables().getFromIndex(2).getAsNumber(), runtimeScene.getScene().getVariables().getFromIndex(3).getAsNumber()) ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDEnemyObjects3[k] = gdjs.Level2Code.GDEnemyObjects3[i];
        ++k;
    }
}
gdjs.Level2Code.GDEnemyObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects3 */
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects3.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects3[i].getBehavior("Pathfinding").moveTo(runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(2).getAsNumber() + 150, runtimeScene.getScene().getVariables().getFromIndex(3).getAsNumber() + 150);
}
}}

}


{

/* Reuse gdjs.Level2Code.GDEnemyObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDEnemyObjects2.length;i<l;++i) {
    if ( !(gdjs.Level2Code.GDEnemyObjects2[i].isCollidingWithPoint(runtimeScene.getScene().getVariables().getFromIndex(2).getAsNumber(), runtimeScene.getScene().getVariables().getFromIndex(3).getAsNumber())) ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDEnemyObjects2[k] = gdjs.Level2Code.GDEnemyObjects2[i];
        ++k;
    }
}
gdjs.Level2Code.GDEnemyObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects2 */
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects2[i].getBehavior("Pathfinding").moveTo(runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(2).getAsNumber(), runtimeScene.getScene().getVariables().getFromIndex(3).getAsNumber());
}
}}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects1Objects = Hashtable.newFrom({"Enemy": gdjs.Level2Code.GDEnemyObjects1});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Level2Code.GDPlayerObjects1});
gdjs.Level2Code.eventsList9 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.distanceTest(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects, gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects2Objects, 70, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects2 */
/* Reuse gdjs.Level2Code.GDPlayerObjects2 */
{runtimeScene.getScene().getVariables().getFromIndex(2).setNumber((( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointX("")) + ((( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointX("")) - (( gdjs.Level2Code.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDPlayerObjects2[0].getPointX(""))));
}{runtimeScene.getScene().getVariables().getFromIndex(2).setNumber((( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointY("")) + ((( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointY("")) - (( gdjs.Level2Code.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDPlayerObjects2[0].getPointY(""))));
}
{ //Subevents
gdjs.Level2Code.eventsList8(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.distanceTest(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects1Objects, gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects, 100, true);
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects1 */
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects1[i].getBehavior("Pathfinding").moveTo(runtimeScene, (gdjs.Level2Code.GDEnemyObjects1[i].getPointX("")), (gdjs.Level2Code.GDEnemyObjects1[i].getPointY("")));
}
}}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects1Objects = Hashtable.newFrom({"Enemy": gdjs.Level2Code.GDEnemyObjects1});
gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Level2Code.GDPlayerObjects1});
gdjs.Level2Code.asyncCallback21402644 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Level2Code.localVariables);
gdjs.Level2Code.localVariables.length = 0;
}
gdjs.Level2Code.eventsList10 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Level2Code.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1.25), (runtimeScene) => (gdjs.Level2Code.asyncCallback21402644(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects = Hashtable.newFrom({"Enemy": gdjs.Level2Code.GDEnemyObjects2});
gdjs.Level2Code.eventsList11 = function(runtimeScene) {

};gdjs.Level2Code.eventsList12 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.raycastObject(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects2Objects, (( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointX("")), (( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getPointY("")), 180, 150, runtimeScene.getScene().getVariables().getFromIndex(5), runtimeScene.getScene().getVariables().getFromIndex(6), true);
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects2 */
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects2[i].getBehavior("Pathfinding").moveTo(runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(5).getAsNumber(), runtimeScene.getScene().getVariables().getFromIndex(6).getAsNumber());
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);

for (gdjs.Level2Code.forEachIndex2 = 0;gdjs.Level2Code.forEachIndex2 < gdjs.Level2Code.GDEnemyObjects1.length;++gdjs.Level2Code.forEachIndex2) {
gdjs.Level2Code.GDEnemyObjects2.length = 0;


gdjs.Level2Code.forEachTemporary2 = gdjs.Level2Code.GDEnemyObjects1[gdjs.Level2Code.forEachIndex2];
gdjs.Level2Code.GDEnemyObjects2.push(gdjs.Level2Code.forEachTemporary2);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == (( gdjs.Level2Code.GDEnemyObjects2.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects2[0].getZOrder()));
}
if (isConditionTrue_0) {
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects2.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects2[i].deleteFromScene(runtimeScene);
}
}}
}

}


};gdjs.Level2Code.eventsList13 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Bush1"), gdjs.Level2Code.GDBush1Objects1);
gdjs.copyArray(runtimeScene.getObjects("DialogBoxd"), gdjs.Level2Code.GDDialogBoxdObjects1);
gdjs.copyArray(runtimeScene.getObjects("E"), gdjs.Level2Code.GDEObjects1);
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("House1"), gdjs.Level2Code.GDHouse1Objects1);
gdjs.copyArray(runtimeScene.getObjects("House2"), gdjs.Level2Code.GDHouse2Objects1);
gdjs.copyArray(runtimeScene.getObjects("NPC"), gdjs.Level2Code.GDNPCObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Ground"), gdjs.Level2Code.GDTilemap_9595GroundObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Water"), gdjs.Level2Code.GDTilemap_9595WaterObjects1);
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.Level2Code.GDTransitionObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tree1"), gdjs.Level2Code.GDTree1Objects1);
gdjs.copyArray(runtimeScene.getObjects("Tree2"), gdjs.Level2Code.GDTree2Objects1);
gdjs.copyArray(runtimeScene.getObjects("yes"), gdjs.Level2Code.GDyesObjects1);
{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 0.5, "Circular", "Backward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 4, "", 0);
}{for(var i = 0, len = gdjs.Level2Code.GDTree1Objects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTree1Objects1[i].setZOrder((gdjs.Level2Code.GDTree1Objects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDBush1Objects1.length ;i < len;++i) {
    gdjs.Level2Code.GDBush1Objects1[i].setZOrder((gdjs.Level2Code.GDBush1Objects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDTree2Objects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTree2Objects1[i].setZOrder((gdjs.Level2Code.GDTree2Objects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDHouse1Objects1.length ;i < len;++i) {
    gdjs.Level2Code.GDHouse1Objects1[i].setZOrder((gdjs.Level2Code.GDHouse1Objects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDHouse2Objects1.length ;i < len;++i) {
    gdjs.Level2Code.GDHouse2Objects1[i].setZOrder((gdjs.Level2Code.GDHouse2Objects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDNPCObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDNPCObjects1[i].setZOrder((gdjs.Level2Code.GDNPCObjects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDTilemap_9595GroundObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTilemap_9595GroundObjects1[i].setZOrder((gdjs.Level2Code.GDTilemap_9595GroundObjects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDTilemap_9595WaterObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTilemap_9595WaterObjects1[i].setZOrder((gdjs.Level2Code.GDTilemap_9595WaterObjects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects1[i].setZOrder((gdjs.Level2Code.GDEnemyObjects1[i].getY()));
}
for(var i = 0, len = gdjs.Level2Code.GDyesObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDyesObjects1[i].setZOrder((gdjs.Level2Code.GDyesObjects1[i].getY()));
}
}{for(var i = 0, len = gdjs.Level2Code.GDEObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDEObjects1[i].getBehavior("ShakeObject_PositionAngle").ShakeObject_PositionAngle(0.5, 0, 1, 10, 1, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.Level2Code.GDDialogBoxdObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDDialogBoxdObjects1[i].hide();
}
}{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(0);
}{runtimeScene.getGame().getVariables().getFromIndex(1).setBoolean(false);
}{runtimeScene.getScene().getVariables().getFromIndex(1).setNumber(2);
}
{ //Subevents
gdjs.Level2Code.eventsList1(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Bush1"), gdjs.Level2Code.GDBush1Objects1);
gdjs.copyArray(runtimeScene.getObjects("CameraTarget"), gdjs.Level2Code.GDCameraTargetObjects1);
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("House1"), gdjs.Level2Code.GDHouse1Objects1);
gdjs.copyArray(runtimeScene.getObjects("House2"), gdjs.Level2Code.GDHouse2Objects1);
gdjs.copyArray(runtimeScene.getObjects("NPC"), gdjs.Level2Code.GDNPCObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Ground"), gdjs.Level2Code.GDTilemap_9595GroundObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tilemap_Water"), gdjs.Level2Code.GDTilemap_9595WaterObjects1);
gdjs.copyArray(runtimeScene.getObjects("Tree1"), gdjs.Level2Code.GDTree1Objects1);
gdjs.copyArray(runtimeScene.getObjects("Tree2"), gdjs.Level2Code.GDTree2Objects1);
gdjs.copyArray(runtimeScene.getObjects("yes"), gdjs.Level2Code.GDyesObjects1);
{for(var i = 0, len = gdjs.Level2Code.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDPlayerObjects1[i].separateFromObjectsList(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDTree1Objects1ObjectsGDgdjs_9546Level2Code_9546GDBush1Objects1ObjectsGDgdjs_9546Level2Code_9546GDTree2Objects1ObjectsGDgdjs_9546Level2Code_9546GDHouse1Objects1ObjectsGDgdjs_9546Level2Code_9546GDHouse2Objects1ObjectsGDgdjs_9546Level2Code_9546GDNPCObjects1ObjectsGDgdjs_9546Level2Code_9546GDTilemap_95959595GroundObjects1ObjectsGDgdjs_9546Level2Code_9546GDTilemap_95959595WaterObjects1ObjectsGDgdjs_9546Level2Code_9546GDEnemyObjects1ObjectsGDgdjs_9546Level2Code_9546GDyesObjects1Objects, false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDCameraTargetObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDCameraTargetObjects1[i].setX(gdjs.evtTools.common.lerp((gdjs.Level2Code.GDCameraTargetObjects1[i].getPointX("")), (( gdjs.Level2Code.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.Level2Code.GDPlayerObjects1[0].getPointX("")), 0.05));
}
}{for(var i = 0, len = gdjs.Level2Code.GDCameraTargetObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDCameraTargetObjects1[i].setY(gdjs.evtTools.common.lerp((gdjs.Level2Code.GDCameraTargetObjects1[i].getPointY("")), (( gdjs.Level2Code.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.Level2Code.GDPlayerObjects1[0].getPointY("")), 0.05));
}
}{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.Level2Code.GDCameraTargetObjects1.length !== 0 ? gdjs.Level2Code.GDCameraTargetObjects1[0] : null), true, "", 0);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Level2Code.GDPlayerObjects1.length;i<l;++i) {
    if ( !(gdjs.Level2Code.GDPlayerObjects1[i].getBehavior("TopDownMovement").isMoving()) ) {
        isConditionTrue_0 = true;
        gdjs.Level2Code.GDPlayerObjects1[k] = gdjs.Level2Code.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.Level2Code.GDPlayerObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDPlayerObjects1 */
{for(var i = 0, len = gdjs.Level2Code.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDPlayerObjects1[i].setAnimationFrame(0);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21385516);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);
{for(var i = 0, len = gdjs.Level2Code.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDEnemyObjects1[i].getBehavior("Pathfinding").moveTo(runtimeScene, gdjs.evtTools.input.getCursorX(runtimeScene, "", 0), gdjs.evtTools.input.getCursorY(runtimeScene, "", 0));
}
}}

}


{


gdjs.Level2Code.eventsList4(runtimeScene);
}


{


gdjs.Level2Code.eventsList6(runtimeScene);
}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("Portal"), gdjs.Level2Code.GDPortalObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects, gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPortalObjects1Objects, false, runtimeScene, true);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.Level2Code.GDTransitionObjects1);
{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 1, "Circular", "Forward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.Level2Code.eventsList7(runtimeScene);} //End of subevents
}

}


{


gdjs.Level2Code.eventsList9(runtimeScene);
}


{

gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.Level2Code.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Level2Code.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDEnemyObjects1Objects, gdjs.Level2Code.mapOfGDgdjs_9546Level2Code_9546GDPlayerObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = !runtimeScene.getGame().getVariables().getFromIndex(1).getAsBoolean();
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Level2Code.GDEnemyObjects1 */
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.Level2Code.GDTransitionObjects1);
{runtimeScene.getGame().getVariables().getFromIndex(1).setBoolean(true);
}{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber((( gdjs.Level2Code.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.Level2Code.GDEnemyObjects1[0].getZOrder()));
}{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].hide(false);
}
}{for(var i = 0, len = gdjs.Level2Code.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.Level2Code.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 1, "Circular", "Forward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "Battle");
}
{ //Subevents
gdjs.Level2Code.eventsList10(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getGame().getVariables().getFromIndex(1).getAsBoolean();
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustResumed(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(2).getAsString() == "win");
}
}
}
if (isConditionTrue_0) {
{runtimeScene.getGame().getVariables().getFromIndex(1).setBoolean(false);
}
{ //Subevents
gdjs.Level2Code.eventsList12(runtimeScene);} //End of subevents
}

}


};

gdjs.Level2Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Level2Code.GDDialogBoxdObjects1.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects2.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects3.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects4.length = 0;
gdjs.Level2Code.GDNPCObjects1.length = 0;
gdjs.Level2Code.GDNPCObjects2.length = 0;
gdjs.Level2Code.GDNPCObjects3.length = 0;
gdjs.Level2Code.GDNPCObjects4.length = 0;
gdjs.Level2Code.GDTree1Objects1.length = 0;
gdjs.Level2Code.GDTree1Objects2.length = 0;
gdjs.Level2Code.GDTree1Objects3.length = 0;
gdjs.Level2Code.GDTree1Objects4.length = 0;
gdjs.Level2Code.GDTree2Objects1.length = 0;
gdjs.Level2Code.GDTree2Objects2.length = 0;
gdjs.Level2Code.GDTree2Objects3.length = 0;
gdjs.Level2Code.GDTree2Objects4.length = 0;
gdjs.Level2Code.GDBush1Objects1.length = 0;
gdjs.Level2Code.GDBush1Objects2.length = 0;
gdjs.Level2Code.GDBush1Objects3.length = 0;
gdjs.Level2Code.GDBush1Objects4.length = 0;
gdjs.Level2Code.GDHouse1Objects1.length = 0;
gdjs.Level2Code.GDHouse1Objects2.length = 0;
gdjs.Level2Code.GDHouse1Objects3.length = 0;
gdjs.Level2Code.GDHouse1Objects4.length = 0;
gdjs.Level2Code.GDHouse2Objects1.length = 0;
gdjs.Level2Code.GDHouse2Objects2.length = 0;
gdjs.Level2Code.GDHouse2Objects3.length = 0;
gdjs.Level2Code.GDHouse2Objects4.length = 0;
gdjs.Level2Code.GDEObjects1.length = 0;
gdjs.Level2Code.GDEObjects2.length = 0;
gdjs.Level2Code.GDEObjects3.length = 0;
gdjs.Level2Code.GDEObjects4.length = 0;
gdjs.Level2Code.GDE2Objects1.length = 0;
gdjs.Level2Code.GDE2Objects2.length = 0;
gdjs.Level2Code.GDE2Objects3.length = 0;
gdjs.Level2Code.GDE2Objects4.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects1.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects2.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects3.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects4.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects1.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects2.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects3.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects4.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects1.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects2.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects3.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects4.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects1.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects2.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects3.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects4.length = 0;
gdjs.Level2Code.GDCameraTargetObjects1.length = 0;
gdjs.Level2Code.GDCameraTargetObjects2.length = 0;
gdjs.Level2Code.GDCameraTargetObjects3.length = 0;
gdjs.Level2Code.GDCameraTargetObjects4.length = 0;
gdjs.Level2Code.GDPortalObjects1.length = 0;
gdjs.Level2Code.GDPortalObjects2.length = 0;
gdjs.Level2Code.GDPortalObjects3.length = 0;
gdjs.Level2Code.GDPortalObjects4.length = 0;
gdjs.Level2Code.GDPlayerObjects1.length = 0;
gdjs.Level2Code.GDPlayerObjects2.length = 0;
gdjs.Level2Code.GDPlayerObjects3.length = 0;
gdjs.Level2Code.GDPlayerObjects4.length = 0;
gdjs.Level2Code.GDEnemyObjects1.length = 0;
gdjs.Level2Code.GDEnemyObjects2.length = 0;
gdjs.Level2Code.GDEnemyObjects3.length = 0;
gdjs.Level2Code.GDEnemyObjects4.length = 0;
gdjs.Level2Code.GDDebugTextObjects1.length = 0;
gdjs.Level2Code.GDDebugTextObjects2.length = 0;
gdjs.Level2Code.GDDebugTextObjects3.length = 0;
gdjs.Level2Code.GDDebugTextObjects4.length = 0;
gdjs.Level2Code.GDyesObjects1.length = 0;
gdjs.Level2Code.GDyesObjects2.length = 0;
gdjs.Level2Code.GDyesObjects3.length = 0;
gdjs.Level2Code.GDyesObjects4.length = 0;
gdjs.Level2Code.GDNewSpriteObjects1.length = 0;
gdjs.Level2Code.GDNewSpriteObjects2.length = 0;
gdjs.Level2Code.GDNewSpriteObjects3.length = 0;
gdjs.Level2Code.GDNewSpriteObjects4.length = 0;
gdjs.Level2Code.GDtrwwwObjects1.length = 0;
gdjs.Level2Code.GDtrwwwObjects2.length = 0;
gdjs.Level2Code.GDtrwwwObjects3.length = 0;
gdjs.Level2Code.GDtrwwwObjects4.length = 0;
gdjs.Level2Code.GDTransitionObjects1.length = 0;
gdjs.Level2Code.GDTransitionObjects2.length = 0;
gdjs.Level2Code.GDTransitionObjects3.length = 0;
gdjs.Level2Code.GDTransitionObjects4.length = 0;

gdjs.Level2Code.eventsList13(runtimeScene);
gdjs.Level2Code.GDDialogBoxdObjects1.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects2.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects3.length = 0;
gdjs.Level2Code.GDDialogBoxdObjects4.length = 0;
gdjs.Level2Code.GDNPCObjects1.length = 0;
gdjs.Level2Code.GDNPCObjects2.length = 0;
gdjs.Level2Code.GDNPCObjects3.length = 0;
gdjs.Level2Code.GDNPCObjects4.length = 0;
gdjs.Level2Code.GDTree1Objects1.length = 0;
gdjs.Level2Code.GDTree1Objects2.length = 0;
gdjs.Level2Code.GDTree1Objects3.length = 0;
gdjs.Level2Code.GDTree1Objects4.length = 0;
gdjs.Level2Code.GDTree2Objects1.length = 0;
gdjs.Level2Code.GDTree2Objects2.length = 0;
gdjs.Level2Code.GDTree2Objects3.length = 0;
gdjs.Level2Code.GDTree2Objects4.length = 0;
gdjs.Level2Code.GDBush1Objects1.length = 0;
gdjs.Level2Code.GDBush1Objects2.length = 0;
gdjs.Level2Code.GDBush1Objects3.length = 0;
gdjs.Level2Code.GDBush1Objects4.length = 0;
gdjs.Level2Code.GDHouse1Objects1.length = 0;
gdjs.Level2Code.GDHouse1Objects2.length = 0;
gdjs.Level2Code.GDHouse1Objects3.length = 0;
gdjs.Level2Code.GDHouse1Objects4.length = 0;
gdjs.Level2Code.GDHouse2Objects1.length = 0;
gdjs.Level2Code.GDHouse2Objects2.length = 0;
gdjs.Level2Code.GDHouse2Objects3.length = 0;
gdjs.Level2Code.GDHouse2Objects4.length = 0;
gdjs.Level2Code.GDEObjects1.length = 0;
gdjs.Level2Code.GDEObjects2.length = 0;
gdjs.Level2Code.GDEObjects3.length = 0;
gdjs.Level2Code.GDEObjects4.length = 0;
gdjs.Level2Code.GDE2Objects1.length = 0;
gdjs.Level2Code.GDE2Objects2.length = 0;
gdjs.Level2Code.GDE2Objects3.length = 0;
gdjs.Level2Code.GDE2Objects4.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects1.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects2.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects3.length = 0;
gdjs.Level2Code.GDShadedDarkJoystickObjects4.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects1.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects2.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects3.length = 0;
gdjs.Level2Code.GDTargetRoundButtonObjects4.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects1.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects2.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects3.length = 0;
gdjs.Level2Code.GDTilemap_9595GroundObjects4.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects1.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects2.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects3.length = 0;
gdjs.Level2Code.GDTilemap_9595WaterObjects4.length = 0;
gdjs.Level2Code.GDCameraTargetObjects1.length = 0;
gdjs.Level2Code.GDCameraTargetObjects2.length = 0;
gdjs.Level2Code.GDCameraTargetObjects3.length = 0;
gdjs.Level2Code.GDCameraTargetObjects4.length = 0;
gdjs.Level2Code.GDPortalObjects1.length = 0;
gdjs.Level2Code.GDPortalObjects2.length = 0;
gdjs.Level2Code.GDPortalObjects3.length = 0;
gdjs.Level2Code.GDPortalObjects4.length = 0;
gdjs.Level2Code.GDPlayerObjects1.length = 0;
gdjs.Level2Code.GDPlayerObjects2.length = 0;
gdjs.Level2Code.GDPlayerObjects3.length = 0;
gdjs.Level2Code.GDPlayerObjects4.length = 0;
gdjs.Level2Code.GDEnemyObjects1.length = 0;
gdjs.Level2Code.GDEnemyObjects2.length = 0;
gdjs.Level2Code.GDEnemyObjects3.length = 0;
gdjs.Level2Code.GDEnemyObjects4.length = 0;
gdjs.Level2Code.GDDebugTextObjects1.length = 0;
gdjs.Level2Code.GDDebugTextObjects2.length = 0;
gdjs.Level2Code.GDDebugTextObjects3.length = 0;
gdjs.Level2Code.GDDebugTextObjects4.length = 0;
gdjs.Level2Code.GDyesObjects1.length = 0;
gdjs.Level2Code.GDyesObjects2.length = 0;
gdjs.Level2Code.GDyesObjects3.length = 0;
gdjs.Level2Code.GDyesObjects4.length = 0;
gdjs.Level2Code.GDNewSpriteObjects1.length = 0;
gdjs.Level2Code.GDNewSpriteObjects2.length = 0;
gdjs.Level2Code.GDNewSpriteObjects3.length = 0;
gdjs.Level2Code.GDNewSpriteObjects4.length = 0;
gdjs.Level2Code.GDtrwwwObjects1.length = 0;
gdjs.Level2Code.GDtrwwwObjects2.length = 0;
gdjs.Level2Code.GDtrwwwObjects3.length = 0;
gdjs.Level2Code.GDtrwwwObjects4.length = 0;
gdjs.Level2Code.GDTransitionObjects1.length = 0;
gdjs.Level2Code.GDTransitionObjects2.length = 0;
gdjs.Level2Code.GDTransitionObjects3.length = 0;
gdjs.Level2Code.GDTransitionObjects4.length = 0;


return;

}

gdjs['Level2Code'] = gdjs.Level2Code;
