var GenMsgPage={
          inputSection:
               '<div class="container">'+
                  
                  '<div class="GenMsgText row">הודעה כללית </div>'+
                      '<div class="sendFacilty row">'+
                        '<div class="blank col-xs-3"></div>'+
                    '<div class="dropdown">'+
                        '<button class="btn btn-default dropdown-toggle  col-xs-6" type="button" id="faciltyManu" data-toggle="dropdown">בחר מועדונית<span class="caret"></span></button>'+
                        '<div class="dropdown-menu  pull-left col-xs-6 facManuGen">'+
                            '<li><a  href="#">מועדונית1</a></li>'+
                            '<li><a  href="#">מועדונית2</a></li>'+
                            '<li><a  href="#">מועדונית3</a></li>'+
                            '<li><a  href="#">מועדונית4</a></li>'+
                        '</div>'+
                    '</div>'+
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
                  '<div class="sendFacilty row">'+
                     '<div class="blank col-xs-3"></div>'+
                    '<div class="dropdown">'+
                        '<button class="btn btn-default dropdown-toggle  col-xs-6" type="button" id="faciltyManu" data-toggle="dropdown">בחר מועדונית<span class="caret"></span></button>'+
                        '<div class="dropdown-menu  pull-left col-xs-6">'+
                            '<li><a  href="#">מועדונית1</a></li>'+
                            '<li><a  href="#">מועדונית2</a></li>'+
                            '<li><a  href="#">מועדונית3</a></li>'+
                            '<li><a  href="#">מועדונית4</a></li>'+
                        '</div>'+
                    '</div>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'+
                '<div class="sendToRow row">'+
                    '<div class="blank col-xs-7"></div>'+
                    '<div class ="sendToFac col-xs-5">:שלח אל</div>'+
                '</div>'+
              
                '<div class="usersDropdown row">'+

                     '<div class="blank col-xs-2"></div>'+
                        '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle  col-xs-3" type="button" id="faciltyManu" data-toggle="dropdown">רשימה <span class="caret"></span></button>'+
                            '<div class="dropdown-menu  pull-left col-xs-6">'+
                                '<li><a  href="#">1</a></li>'+
                                '<li><a  href="#">2</a></li>'+
                                '<li><a  href="#">3</a></li>'+
                                '<li><a  href="#">4 </a></li>'+
                            '</div>'+
                        '</div>'+

                        '<div class="blank col-xs-2"></div>'+

                        '<div class="dropdown">'+
                            '<button class="btn btn-default dropdown-toggle  col-xs-4" type="button" id="guideManu" data-toggle="dropdown"> בחר משתמש <span class="caret"></span></button>'+
                            '<div class="dropdown-menu  pull-left col-xs-6">'+
                                '<li><a  href="#">מדריך</a></li>'+
                                '<li><a  href="#">הורה</a></li>'+
                                '<li><a  href="#">מורה</a></li>'+
                                '<li><a  href="#">עוס</a></li>'+
                            '</div>'+
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