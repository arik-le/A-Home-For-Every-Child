var GenMsgPage={
          inputSection:
               '<div class="container">'+
                  
                  '<div class="GenMsgText row">הודעה כללית </div>'+
                      '<div class="sendFacilty row">'+
                        '<div class="blank col-xs-3"></div>'+
                        '<select>'+
                            '<option value="club1">מועדונית1</option>'+
                            '<option value="club2">מועדונית2</option>'+
                            '<option value="club3">מועדונית3</option>'+
                            '<option value="club4">מועדונית4</option>'+
                        '</select>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'+
                '<div class="sendToRow row">'+
                    '<div class="blank col-xs-6"></div>'+
                    '<div class ="sendToFac col-xs-5">:שלח אל</div>'+
                '</div>'+
                
                '<div class="userType row" style="max-height:300px; overflow: auto;">'+   
             
                    '<div class="[ form-group ] col-xs-6">'+
                         '<input type="checkbox" name="fancy-checkbox-success" id="fancy-checkbox-success" autocomplete="off" />'+
                         '<div class="[ btn-group ]">'+
                            '<label for="fancy-checkbox-success" class="[ btn btn-success ]">'+
                            '<span class="[ glyphicon glyphicon-ok ]"></span>'+
                            '<span> </span>'+
                            '</label>'+
                             '<label for="fancy-checkbox-success" class="[ btn btn-default active ]">מורים</label>'+
                          '</div>'+
                    '</div>'+
                    '<div class="[ form-group ] col-xs-6">'+
                         '<input type="checkbox" name="fancy-checkbox-info" id="fancy-checkbox-info" autocomplete="off" />'+
                         '<div class="[ btn-group ]">'+
                            '<label for="fancy-checkbox-info" class="[ btn btn-info ]">'+
                            '<span class="[ glyphicon glyphicon-ok ]"></span>'+
                            '<span> </span>'+
                            '</label>'+
                             '<label for="fancy-checkbox-info" class="[ btn btn-default active ]">הורים</label>'+
                        '</div>'+
                    '</div>'+
                  
                '</div>'+

               
                 '<div class="msgSubject row">'+
                   '<div class="blank col-xs-6"></div>'+
                    '<div class ="sendToFac col-xs-5">:נושא</div>'+
                    '<input type="text" class="msgTitle col-xs-11" id="usr" col-xs-12 placeholder="נושא ההודעה">'+
                '</div>'+
                '<div class="msgSubject row">'+
                    '<div class="blank col-xs-6"></div>'+
                    '<div class ="sendToFac col-xs-5">:תוכן ההודעה</div>'+
                   
                '</div>'+
                '<div class= "msg-info form-group-lg">'+
                         '<textarea rows="12"  class="msgBody col-xs-11 " id="usr"  placeholder="...כתוב כאן"></textarea>'+
                '</div>'+
                '<div class= "MsgButtons" rows="4">'+
                    '<div class="blank col-xs-3"></div>'+
                    '<button type="button" class="btn btn-success col-xs-3">שלח</button>'+
                    '<button type="button" class="btn btn-success col-xs-3" id="clrBtn">נקה</button>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'+
                  
               '</div>'
     }
     var PriMsgPage={
          inputSection:
               '<div class="container">'+
                  
                '<div class="GenMsgText row">הודעה פרטית </div>'+
                '<div class="row">'+
                    '<div class="col-xs-offset-3 col-xs-6">'+
                        '<select class="form-control">'+
                            '<option value="club1">מועדונית1</option>'+
                            '<option value="club2">מועדונית2</option>'+
                            '<option value="club3">מועדונית3</option>'+
                            '<option value="club4">מועדונית4</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="sendToRow row">'+
                    '<div class="blank col-xs-7"></div>'+
                    '<div class ="sendToFac col-xs-5">:שלח אל</div>'+
                '</div>'+
             
                '<div class="row">'+
                    '<div class="col-xs-offset-1 col-xs-5">'+
                        '<select class="form-control">'+
                            '<option value="user1">1</option>'+
                            '<option value="user1">2</option>'+
                            '<option value="user1">3</option>'+
                            '<option value="user1">4</option>'+
                        '</select>'+
                    '</div>'+
                    '<div class="col-xs-5">'+  
                        '<select  class="form-control">'+
                                '<option value="type">הורה</option>'+
                                '<option value="type">מורה</option>'+
                                '<option value="type">מדריך</option>'+
                                '<option value="type">עו"ס</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                
                 '<div class="msgSubject row">'+
                    '<div class="blank col-xs-6"></div>'+
                    '<div class ="sendToFacP col-xs-5">:נושא</div>'+
                    '<input type="text" class="msgTitleP col-xs-11" id="usr" placeholder="נושא ההודעה">'+
                '</div>'+
                '<div class="msgSubject row">'+
                    '<div class="blank col-xs-6"></div>'+
                    '<div class ="sendToFacP col-xs-5">:תוכן ההודעה</div>'+
                   
                '</div>'+
                '<div class= "msg-info form-group-lg">'+
                         '<textarea rows="10"  class="msgBody col-xs-11 " id="usr"  placeholder="...כתוב כאן"></textarea>'+
                '</div>'+
                '<div class= "MsgButtons" rows="4">'+
                    '<div class="blank col-xs-3"></div>'+
                    '<button type="button" class="btn btn-success col-xs-3">שלח</button>'+
                    '<button type="button" class="btn btn-success col-xs-3" id="clrBtn">נקה</button>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'+
                      
               '</div>'
     }