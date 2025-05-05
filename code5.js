gdjs.BattleCode = {};
gdjs.BattleCode.localVariables = [];
gdjs.BattleCode.GDEnemyObjects1_1final = [];

gdjs.BattleCode.GDPlayerObjects1_1final = [];

gdjs.BattleCode.GDEnemyObjects1= [];
gdjs.BattleCode.GDEnemyObjects2= [];
gdjs.BattleCode.GDEnemyObjects3= [];
gdjs.BattleCode.GDEnemyObjects4= [];
gdjs.BattleCode.GDEnemyObjects5= [];
gdjs.BattleCode.GDPlayerObjects1= [];
gdjs.BattleCode.GDPlayerObjects2= [];
gdjs.BattleCode.GDPlayerObjects3= [];
gdjs.BattleCode.GDPlayerObjects4= [];
gdjs.BattleCode.GDPlayerObjects5= [];
gdjs.BattleCode.GDPlayerHealthBarObjects1= [];
gdjs.BattleCode.GDPlayerHealthBarObjects2= [];
gdjs.BattleCode.GDPlayerHealthBarObjects3= [];
gdjs.BattleCode.GDPlayerHealthBarObjects4= [];
gdjs.BattleCode.GDPlayerHealthBarObjects5= [];
gdjs.BattleCode.GDEnemyHealthBarObjects1= [];
gdjs.BattleCode.GDEnemyHealthBarObjects2= [];
gdjs.BattleCode.GDEnemyHealthBarObjects3= [];
gdjs.BattleCode.GDEnemyHealthBarObjects4= [];
gdjs.BattleCode.GDEnemyHealthBarObjects5= [];
gdjs.BattleCode.GDDialogueObjects1= [];
gdjs.BattleCode.GDDialogueObjects2= [];
gdjs.BattleCode.GDDialogueObjects3= [];
gdjs.BattleCode.GDDialogueObjects4= [];
gdjs.BattleCode.GDDialogueObjects5= [];
gdjs.BattleCode.GDGrassObjects1= [];
gdjs.BattleCode.GDGrassObjects2= [];
gdjs.BattleCode.GDGrassObjects3= [];
gdjs.BattleCode.GDGrassObjects4= [];
gdjs.BattleCode.GDGrassObjects5= [];
gdjs.BattleCode.GDAttack1Objects1= [];
gdjs.BattleCode.GDAttack1Objects2= [];
gdjs.BattleCode.GDAttack1Objects3= [];
gdjs.BattleCode.GDAttack1Objects4= [];
gdjs.BattleCode.GDAttack1Objects5= [];
gdjs.BattleCode.GDAttack2Objects1= [];
gdjs.BattleCode.GDAttack2Objects2= [];
gdjs.BattleCode.GDAttack2Objects3= [];
gdjs.BattleCode.GDAttack2Objects4= [];
gdjs.BattleCode.GDAttack2Objects5= [];
gdjs.BattleCode.GDRunObjects1= [];
gdjs.BattleCode.GDRunObjects2= [];
gdjs.BattleCode.GDRunObjects3= [];
gdjs.BattleCode.GDRunObjects4= [];
gdjs.BattleCode.GDRunObjects5= [];
gdjs.BattleCode.GDBackgroundObjects1= [];
gdjs.BattleCode.GDBackgroundObjects2= [];
gdjs.BattleCode.GDBackgroundObjects3= [];
gdjs.BattleCode.GDBackgroundObjects4= [];
gdjs.BattleCode.GDBackgroundObjects5= [];
gdjs.BattleCode.GDTextBorderObjects1= [];
gdjs.BattleCode.GDTextBorderObjects2= [];
gdjs.BattleCode.GDTextBorderObjects3= [];
gdjs.BattleCode.GDTextBorderObjects4= [];
gdjs.BattleCode.GDTextBorderObjects5= [];
gdjs.BattleCode.GDDebugTextObjects1= [];
gdjs.BattleCode.GDDebugTextObjects2= [];
gdjs.BattleCode.GDDebugTextObjects3= [];
gdjs.BattleCode.GDDebugTextObjects4= [];
gdjs.BattleCode.GDDebugTextObjects5= [];
gdjs.BattleCode.GDJawabObjects1= [];
gdjs.BattleCode.GDJawabObjects2= [];
gdjs.BattleCode.GDJawabObjects3= [];
gdjs.BattleCode.GDJawabObjects4= [];
gdjs.BattleCode.GDJawabObjects5= [];
gdjs.BattleCode.GDTransitionObjects1= [];
gdjs.BattleCode.GDTransitionObjects2= [];
gdjs.BattleCode.GDTransitionObjects3= [];
gdjs.BattleCode.GDTransitionObjects4= [];
gdjs.BattleCode.GDTransitionObjects5= [];


gdjs.BattleCode.asyncCallback21525996 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects2);

gdjs.copyArray(runtimeScene.getObjects("Grass"), gdjs.BattleCode.GDGrassObjects2);
{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.BattleCode.GDGrassObjects2.length !== 0 ? gdjs.BattleCode.GDGrassObjects2[0] : null), true, "Background", 0);
}{runtimeScene.getGame().getVariables().getFromIndex(2).setString("none");
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects2.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects2[i].getBehavior("Animation").setAnimationName(runtimeScene.getGame().getVariables().getFromIndex(3).getAsString());
}
}gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList0 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
for (const obj of gdjs.BattleCode.GDEnemyObjects1) asyncObjectsList.addObject("Enemy", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.BattleCode.asyncCallback21525996(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("EnemyHealthBar"), gdjs.BattleCode.GDEnemyHealthBarObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("PlayerHealthBar"), gdjs.BattleCode.GDPlayerHealthBarObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDPlayerHealthBarObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerHealthBarObjects1[i].SetValue((( gdjs.BattleCode.GDPlayerObjects1.length === 0 ) ? 0 :gdjs.BattleCode.GDPlayerObjects1[0].getBehavior("Health").Health((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyHealthBarObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyHealthBarObjects1[i].SetValue((( gdjs.BattleCode.GDEnemyObjects1.length === 0 ) ? 0 :gdjs.BattleCode.GDEnemyObjects1[0].getBehavior("Health").Health((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined))), (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}}

}


};gdjs.BattleCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !runtimeScene.getScene().getVariables().getFromIndex(2).getAsBoolean();
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21532444);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("DebugText"), gdjs.BattleCode.GDDebugTextObjects3);
gdjs.copyArray(runtimeScene.getObjects("Dialogue"), gdjs.BattleCode.GDDialogueObjects3);
{runtimeScene.getScene().getVariables().getFromIndex(2).setBoolean(true);
}{runtimeScene.getScene().getVariables().getFromIndex(1).setNumber(gdjs.randomInRange(0, 2));
}{for(var i = 0, len = gdjs.BattleCode.GDDialogueObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDDialogueObjects3[i].getBehavior("Text").setText(runtimeScene.getGame().getVariables().getFromIndex(4).getChild(runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber()).getAsString());
}
}{for(var i = 0, len = gdjs.BattleCode.GDDebugTextObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDDebugTextObjects3[i].getBehavior("Text").setText(runtimeScene.getScene().getVariables().getFromIndex(1).getAsString());
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Attack1"), gdjs.BattleCode.GDAttack1Objects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDAttack1Objects3.length;i<l;++i) {
    if ( gdjs.BattleCode.GDAttack1Objects3[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDAttack1Objects3[k] = gdjs.BattleCode.GDAttack1Objects3[i];
        ++k;
    }
}
gdjs.BattleCode.GDAttack1Objects3.length = k;
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setString("PlayPlayerAttack");
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Run"), gdjs.BattleCode.GDRunObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDRunObjects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDRunObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDRunObjects2[k] = gdjs.BattleCode.GDRunObjects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDRunObjects2.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}}

}


};gdjs.BattleCode.asyncCallback21526588 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects5);

{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects5.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects5[i].getBehavior("ShakeObject_PositionAngle").ShakeObject_PositionAngle(0.5, -(2.5), -(2.5), 0, 2, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{runtimeScene.getScene().getVariables().getFromIndex(2).setBoolean(false);
}{runtimeScene.getScene().getVariables().getFromIndex(0).setString("WaitPlayerChoice");
}gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList3 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
for (const obj of gdjs.BattleCode.GDEnemyObjects4) asyncObjectsList.addObject("Enemy", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.BattleCode.asyncCallback21526588(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.asyncCallback21538916 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(runtimeScene.getObjects("Dialogue"), gdjs.BattleCode.GDDialogueObjects4);
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects4);
{gdjs.evtTools.sound.playSound(runtimeScene, "Attack.wav", false, 90, gdjs.randomFloatInRange(0.9, 1));
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects4[i].getBehavior("ShakeObject_PositionAngle").StopShaking((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects4[i].getBehavior("ShakeObject_PositionAngleScale").ShakeObject_PositionAngleScale(0.6, 7, 7, 5, 10, 0.2, false, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects4[i].getBehavior("Flash").Flash(0.3, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects4[i].getBehavior("Health").Hit(10, true, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDDialogueObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDDialogueObjects4[i].getBehavior("Text").setText("You attacked your enemy.");
}
}
{ //Subevents
gdjs.BattleCode.eventsList3(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList4 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.BattleCode.asyncCallback21538916(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.asyncCallback21537364 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects3);

{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects3[i].getBehavior("Tween").addObjectPositionTween2("BackUp", (gdjs.BattleCode.GDPlayerObjects3[i].getPointX("")) + 67, (gdjs.BattleCode.GDPlayerObjects3[i].getPointY("")), "easeInQuad", 0.1, false);
}
}
{ //Subevents
gdjs.BattleCode.eventsList4(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList5 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
for (const obj of gdjs.BattleCode.GDPlayerObjects2) asyncObjectsList.addObject("Player", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.BattleCode.asyncCallback21537364(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.eventsList6 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Jawab"), gdjs.BattleCode.GDJawabObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDJawabObjects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDJawabObjects2[i].getBehavior("Text").getText() == runtimeScene.getGame().getVariables().getFromIndex(5).getChild(runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber()).getAsString() ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDJawabObjects2[k] = gdjs.BattleCode.GDJawabObjects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDJawabObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21537644);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects2);
{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects2[i].getBehavior("Tween").addObjectPositionTween2("BackUp", (gdjs.BattleCode.GDPlayerObjects2[i].getPointX("")) - 67, (gdjs.BattleCode.GDPlayerObjects2[i].getPointY("")), "easeOutQuad", 0.5, false);
}
}
{ //Subevents
gdjs.BattleCode.eventsList5(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Jawab"), gdjs.BattleCode.GDJawabObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDJawabObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDJawabObjects1[i].getBehavior("Text").getText() != runtimeScene.getGame().getVariables().getFromIndex(5).getChild(runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber()).getAsString() ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDJawabObjects1[k] = gdjs.BattleCode.GDJawabObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDJawabObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21538844);
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setString("WaitEnemyChoice");
}}

}


};gdjs.BattleCode.eventsList7 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Attack1"), gdjs.BattleCode.GDAttack1Objects2);
gdjs.copyArray(runtimeScene.getObjects("Attack2"), gdjs.BattleCode.GDAttack2Objects2);
gdjs.copyArray(runtimeScene.getObjects("Run"), gdjs.BattleCode.GDRunObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDAttack1Objects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDAttack1Objects2[i].IsHovered((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDAttack1Objects2[k] = gdjs.BattleCode.GDAttack1Objects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDAttack1Objects2.length = k;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDAttack2Objects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDAttack2Objects2[i].IsHovered((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDAttack2Objects2[k] = gdjs.BattleCode.GDAttack2Objects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDAttack2Objects2.length = k;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDRunObjects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDRunObjects2[i].IsHovered((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDRunObjects2[k] = gdjs.BattleCode.GDRunObjects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDRunObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21530300);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSound(runtimeScene, "HoverSound.wav", false, 20, gdjs.randomFloatInRange(0.8, 0.9));
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsString() == "WaitPlayerChoice");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.BattleCode.eventsList2(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsString() == "PlayPlayerAttack");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.BattleCode.eventsList6(runtimeScene);} //End of subevents
}

}


};gdjs.BattleCode.asyncCallback21484724 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
{runtimeScene.getScene().getVariables().getFromIndex(0).setString("PlayEnemyAttack");
}gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList8 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.BattleCode.asyncCallback21484724(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.eventsList9 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21485396);
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.BattleCode.eventsList8(runtimeScene);} //End of subevents
}

}


};gdjs.BattleCode.asyncCallback21523612 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects4);

{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects4.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects4[i].getBehavior("ShakeObject_PositionAngle").ShakeObject_PositionAngle(0.5, 3.5, 3.5, 0, 2, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{runtimeScene.getScene().getVariables().getFromIndex(2).setBoolean(false);
}{runtimeScene.getScene().getVariables().getFromIndex(0).setString("WaitPlayerChoice");
}gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList10 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
for (const obj of gdjs.BattleCode.GDPlayerObjects3) asyncObjectsList.addObject("Player", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1.5), (runtimeScene) => (gdjs.BattleCode.asyncCallback21523612(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.asyncCallback21519156 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(runtimeScene.getObjects("Dialogue"), gdjs.BattleCode.GDDialogueObjects3);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects3);
{gdjs.evtTools.sound.playSound(runtimeScene, "Attack.wav", false, 90, gdjs.randomFloatInRange(0.9, 1));
}{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects3[i].getBehavior("ShakeObject_PositionAngleScale").ShakeObject_PositionAngleScale(0.6, 7, 7, 5, 10, 0.2, false, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects3[i].getBehavior("Flash").Flash(0.3, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects3[i].getBehavior("Health").Hit(10, true, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDDialogueObjects3.length ;i < len;++i) {
    gdjs.BattleCode.GDDialogueObjects3[i].getBehavior("Text").setText("Your enemy attacked you.");
}
}
{ //Subevents
gdjs.BattleCode.eventsList10(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList11 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.BattleCode.asyncCallback21519156(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.asyncCallback21519084 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects2);

{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects2.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects2[i].getBehavior("Tween").addObjectPositionTween2("BackUp", (gdjs.BattleCode.GDEnemyObjects2[i].getPointX("")) - 67, (gdjs.BattleCode.GDEnemyObjects2[i].getPointY("")), "easeInQuad", 0.1, false);
}
}
{ //Subevents
gdjs.BattleCode.eventsList11(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList12 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
for (const obj of gdjs.BattleCode.GDEnemyObjects1) asyncObjectsList.addObject("Enemy", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.BattleCode.asyncCallback21519084(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.eventsList13 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(21482876);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects1[i].getBehavior("Tween").addObjectPositionTween2("BackUp", (gdjs.BattleCode.GDEnemyObjects1[i].getPointX("")) + 67, (gdjs.BattleCode.GDEnemyObjects1[i].getPointY("")), "easeOutQuad", 0.5, false);
}
}
{ //Subevents
gdjs.BattleCode.eventsList12(runtimeScene);} //End of subevents
}

}


};gdjs.BattleCode.eventsList14 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsString() == "WaitEnemyChoice");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.BattleCode.eventsList9(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsString() == "PlayEnemyAttack");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.BattleCode.eventsList13(runtimeScene);} //End of subevents
}

}


};gdjs.BattleCode.asyncCallback21497660 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.BattleCode.localVariables);
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}gdjs.BattleCode.localVariables.length = 0;
}
gdjs.BattleCode.eventsList15 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.BattleCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.BattleCode.asyncCallback21497660(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.BattleCode.eventsList16 = function(runtimeScene) {

{

gdjs.BattleCode.GDEnemyObjects1.length = 0;

gdjs.BattleCode.GDPlayerObjects1.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{gdjs.BattleCode.GDEnemyObjects1_1final.length = 0;
gdjs.BattleCode.GDPlayerObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects2);
for (var i = 0, k = 0, l = gdjs.BattleCode.GDEnemyObjects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDEnemyObjects2[i].getBehavior("Health").IsDead((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_1 = true;
        gdjs.BattleCode.GDEnemyObjects2[k] = gdjs.BattleCode.GDEnemyObjects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDEnemyObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.BattleCode.GDEnemyObjects2.length; j < jLen ; ++j) {
        if ( gdjs.BattleCode.GDEnemyObjects1_1final.indexOf(gdjs.BattleCode.GDEnemyObjects2[j]) === -1 )
            gdjs.BattleCode.GDEnemyObjects1_1final.push(gdjs.BattleCode.GDEnemyObjects2[j]);
    }
}
}
{
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects2);
for (var i = 0, k = 0, l = gdjs.BattleCode.GDPlayerObjects2.length;i<l;++i) {
    if ( gdjs.BattleCode.GDPlayerObjects2[i].getBehavior("Health").IsDead((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_1 = true;
        gdjs.BattleCode.GDPlayerObjects2[k] = gdjs.BattleCode.GDPlayerObjects2[i];
        ++k;
    }
}
gdjs.BattleCode.GDPlayerObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.BattleCode.GDPlayerObjects2.length; j < jLen ; ++j) {
        if ( gdjs.BattleCode.GDPlayerObjects1_1final.indexOf(gdjs.BattleCode.GDPlayerObjects2[j]) === -1 )
            gdjs.BattleCode.GDPlayerObjects1_1final.push(gdjs.BattleCode.GDPlayerObjects2[j]);
    }
}
}
{
gdjs.copyArray(gdjs.BattleCode.GDEnemyObjects1_1final, gdjs.BattleCode.GDEnemyObjects1);
gdjs.copyArray(gdjs.BattleCode.GDPlayerObjects1_1final, gdjs.BattleCode.GDPlayerObjects1);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.BattleCode.GDTransitionObjects1);
{runtimeScene.getGame().getVariables().getFromIndex(2).setString("win");
}{for(var i = 0, len = gdjs.BattleCode.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 1, "Circular", "Forward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDTransitionObjects1[i].hide(false);
}
}
{ //Subevents
gdjs.BattleCode.eventsList15(runtimeScene);} //End of subevents
}

}


};gdjs.BattleCode.eventsList17 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Enemy"), gdjs.BattleCode.GDEnemyObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.BattleCode.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("Transition"), gdjs.BattleCode.GDTransitionObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDTransitionObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDTransitionObjects1[i].getBehavior("FlashTransitionPainter").PaintEffect("0;0;0", 0.5, "Circular", "Backward", 255, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDPlayerObjects1[i].getBehavior("ShakeObject_PositionAngle").ShakeObject_PositionAngle(0.5, 7, 7, 0, 2, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{for(var i = 0, len = gdjs.BattleCode.GDEnemyObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDEnemyObjects1[i].getBehavior("ShakeObject_PositionAngle").ShakeObject_PositionAngle(0.5, -(5), -(5), 0, 2, true, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 6.5, "Background", 0);
}
{ //Subevents
gdjs.BattleCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


gdjs.BattleCode.eventsList1(runtimeScene);
}


{


gdjs.BattleCode.eventsList7(runtimeScene);
}


{


gdjs.BattleCode.eventsList14(runtimeScene);
}


{


gdjs.BattleCode.eventsList16(runtimeScene);
}


};

gdjs.BattleCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.BattleCode.GDEnemyObjects1.length = 0;
gdjs.BattleCode.GDEnemyObjects2.length = 0;
gdjs.BattleCode.GDEnemyObjects3.length = 0;
gdjs.BattleCode.GDEnemyObjects4.length = 0;
gdjs.BattleCode.GDEnemyObjects5.length = 0;
gdjs.BattleCode.GDPlayerObjects1.length = 0;
gdjs.BattleCode.GDPlayerObjects2.length = 0;
gdjs.BattleCode.GDPlayerObjects3.length = 0;
gdjs.BattleCode.GDPlayerObjects4.length = 0;
gdjs.BattleCode.GDPlayerObjects5.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects1.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects2.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects3.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects4.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects5.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects1.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects2.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects3.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects4.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects5.length = 0;
gdjs.BattleCode.GDDialogueObjects1.length = 0;
gdjs.BattleCode.GDDialogueObjects2.length = 0;
gdjs.BattleCode.GDDialogueObjects3.length = 0;
gdjs.BattleCode.GDDialogueObjects4.length = 0;
gdjs.BattleCode.GDDialogueObjects5.length = 0;
gdjs.BattleCode.GDGrassObjects1.length = 0;
gdjs.BattleCode.GDGrassObjects2.length = 0;
gdjs.BattleCode.GDGrassObjects3.length = 0;
gdjs.BattleCode.GDGrassObjects4.length = 0;
gdjs.BattleCode.GDGrassObjects5.length = 0;
gdjs.BattleCode.GDAttack1Objects1.length = 0;
gdjs.BattleCode.GDAttack1Objects2.length = 0;
gdjs.BattleCode.GDAttack1Objects3.length = 0;
gdjs.BattleCode.GDAttack1Objects4.length = 0;
gdjs.BattleCode.GDAttack1Objects5.length = 0;
gdjs.BattleCode.GDAttack2Objects1.length = 0;
gdjs.BattleCode.GDAttack2Objects2.length = 0;
gdjs.BattleCode.GDAttack2Objects3.length = 0;
gdjs.BattleCode.GDAttack2Objects4.length = 0;
gdjs.BattleCode.GDAttack2Objects5.length = 0;
gdjs.BattleCode.GDRunObjects1.length = 0;
gdjs.BattleCode.GDRunObjects2.length = 0;
gdjs.BattleCode.GDRunObjects3.length = 0;
gdjs.BattleCode.GDRunObjects4.length = 0;
gdjs.BattleCode.GDRunObjects5.length = 0;
gdjs.BattleCode.GDBackgroundObjects1.length = 0;
gdjs.BattleCode.GDBackgroundObjects2.length = 0;
gdjs.BattleCode.GDBackgroundObjects3.length = 0;
gdjs.BattleCode.GDBackgroundObjects4.length = 0;
gdjs.BattleCode.GDBackgroundObjects5.length = 0;
gdjs.BattleCode.GDTextBorderObjects1.length = 0;
gdjs.BattleCode.GDTextBorderObjects2.length = 0;
gdjs.BattleCode.GDTextBorderObjects3.length = 0;
gdjs.BattleCode.GDTextBorderObjects4.length = 0;
gdjs.BattleCode.GDTextBorderObjects5.length = 0;
gdjs.BattleCode.GDDebugTextObjects1.length = 0;
gdjs.BattleCode.GDDebugTextObjects2.length = 0;
gdjs.BattleCode.GDDebugTextObjects3.length = 0;
gdjs.BattleCode.GDDebugTextObjects4.length = 0;
gdjs.BattleCode.GDDebugTextObjects5.length = 0;
gdjs.BattleCode.GDJawabObjects1.length = 0;
gdjs.BattleCode.GDJawabObjects2.length = 0;
gdjs.BattleCode.GDJawabObjects3.length = 0;
gdjs.BattleCode.GDJawabObjects4.length = 0;
gdjs.BattleCode.GDJawabObjects5.length = 0;
gdjs.BattleCode.GDTransitionObjects1.length = 0;
gdjs.BattleCode.GDTransitionObjects2.length = 0;
gdjs.BattleCode.GDTransitionObjects3.length = 0;
gdjs.BattleCode.GDTransitionObjects4.length = 0;
gdjs.BattleCode.GDTransitionObjects5.length = 0;

gdjs.BattleCode.eventsList17(runtimeScene);
gdjs.BattleCode.GDEnemyObjects1.length = 0;
gdjs.BattleCode.GDEnemyObjects2.length = 0;
gdjs.BattleCode.GDEnemyObjects3.length = 0;
gdjs.BattleCode.GDEnemyObjects4.length = 0;
gdjs.BattleCode.GDEnemyObjects5.length = 0;
gdjs.BattleCode.GDPlayerObjects1.length = 0;
gdjs.BattleCode.GDPlayerObjects2.length = 0;
gdjs.BattleCode.GDPlayerObjects3.length = 0;
gdjs.BattleCode.GDPlayerObjects4.length = 0;
gdjs.BattleCode.GDPlayerObjects5.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects1.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects2.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects3.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects4.length = 0;
gdjs.BattleCode.GDPlayerHealthBarObjects5.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects1.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects2.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects3.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects4.length = 0;
gdjs.BattleCode.GDEnemyHealthBarObjects5.length = 0;
gdjs.BattleCode.GDDialogueObjects1.length = 0;
gdjs.BattleCode.GDDialogueObjects2.length = 0;
gdjs.BattleCode.GDDialogueObjects3.length = 0;
gdjs.BattleCode.GDDialogueObjects4.length = 0;
gdjs.BattleCode.GDDialogueObjects5.length = 0;
gdjs.BattleCode.GDGrassObjects1.length = 0;
gdjs.BattleCode.GDGrassObjects2.length = 0;
gdjs.BattleCode.GDGrassObjects3.length = 0;
gdjs.BattleCode.GDGrassObjects4.length = 0;
gdjs.BattleCode.GDGrassObjects5.length = 0;
gdjs.BattleCode.GDAttack1Objects1.length = 0;
gdjs.BattleCode.GDAttack1Objects2.length = 0;
gdjs.BattleCode.GDAttack1Objects3.length = 0;
gdjs.BattleCode.GDAttack1Objects4.length = 0;
gdjs.BattleCode.GDAttack1Objects5.length = 0;
gdjs.BattleCode.GDAttack2Objects1.length = 0;
gdjs.BattleCode.GDAttack2Objects2.length = 0;
gdjs.BattleCode.GDAttack2Objects3.length = 0;
gdjs.BattleCode.GDAttack2Objects4.length = 0;
gdjs.BattleCode.GDAttack2Objects5.length = 0;
gdjs.BattleCode.GDRunObjects1.length = 0;
gdjs.BattleCode.GDRunObjects2.length = 0;
gdjs.BattleCode.GDRunObjects3.length = 0;
gdjs.BattleCode.GDRunObjects4.length = 0;
gdjs.BattleCode.GDRunObjects5.length = 0;
gdjs.BattleCode.GDBackgroundObjects1.length = 0;
gdjs.BattleCode.GDBackgroundObjects2.length = 0;
gdjs.BattleCode.GDBackgroundObjects3.length = 0;
gdjs.BattleCode.GDBackgroundObjects4.length = 0;
gdjs.BattleCode.GDBackgroundObjects5.length = 0;
gdjs.BattleCode.GDTextBorderObjects1.length = 0;
gdjs.BattleCode.GDTextBorderObjects2.length = 0;
gdjs.BattleCode.GDTextBorderObjects3.length = 0;
gdjs.BattleCode.GDTextBorderObjects4.length = 0;
gdjs.BattleCode.GDTextBorderObjects5.length = 0;
gdjs.BattleCode.GDDebugTextObjects1.length = 0;
gdjs.BattleCode.GDDebugTextObjects2.length = 0;
gdjs.BattleCode.GDDebugTextObjects3.length = 0;
gdjs.BattleCode.GDDebugTextObjects4.length = 0;
gdjs.BattleCode.GDDebugTextObjects5.length = 0;
gdjs.BattleCode.GDJawabObjects1.length = 0;
gdjs.BattleCode.GDJawabObjects2.length = 0;
gdjs.BattleCode.GDJawabObjects3.length = 0;
gdjs.BattleCode.GDJawabObjects4.length = 0;
gdjs.BattleCode.GDJawabObjects5.length = 0;
gdjs.BattleCode.GDTransitionObjects1.length = 0;
gdjs.BattleCode.GDTransitionObjects2.length = 0;
gdjs.BattleCode.GDTransitionObjects3.length = 0;
gdjs.BattleCode.GDTransitionObjects4.length = 0;
gdjs.BattleCode.GDTransitionObjects5.length = 0;


return;

}

gdjs['BattleCode'] = gdjs.BattleCode;
