/**************host地址**************/
//到控制层
apiServer.partycs = party_server+'/partyApi/partycs';//会员
apiServer.smscs = party_server+'/partyApi/smscs';//短信
apiServer.businesspermissioncs = party_server+'/partyApi/businesspermissioncs';//许可
apiServer.personcs = party_server+'/partyApi/personcs';//个人
apiServer.invitationcodecs = party_server+'/partyApi/invitationcodecs';//邀请码
apiServer.shortlinkcs = com_server + '/contactApi/shortlinkcs';//短链
apiServer.versioncs = party_server+'/partyApi/versioncs';//更新
apiServer.knowledgecs = party_server+'/partyApi/knowledgecs';//帮助中心

/**
 * 完整url
 */
//partycs
apiUrl.selectPartyInformationByPartyId =apiServer.partycs+'/selectPartyInformationByPartyId?app_stoken='+app_stoken;//我的页面名字
apiUrl.updatePartyAndApply =apiServer.partycs+'/updatePartyAndApply?app_stoken='+app_stoken;//保存会员及申请

apiUrl.insertPartyInformationNew = apiServer.partycs + '/insertPartyInformationNew?app_stoken='+app_stoken;//校验手机号码是否存在

//businesspermissioncs
apiUrl.selectBusinessPermissionByPartyId =apiServer.businesspermissioncs+'/selectBusinessPermissionByPartyId?app_stoken='+app_stoken;//会员许可

//personcs


//smscs

apiUrl.validateIdentifyCode=apiServer.smscs+'/validateIdentifyCode?app_stoken='+app_stoken;//校验验证码

//invitation
apiUrl.getPartyInvitationCodeByPartyId =apiServer.invitationcodecs+'/getPartyInvitationCodeByPartyId?datasource=adApp&sourcecode=0103010101&app_stoken='+app_stoken;//邀请码
apiUrl.shortlinkinsert = apiServer.shortlinkcs + '/insert?datasource=adApp&sourcecode=0103010101&app_stoken=' + app_stoken;//短链地址
apiUrl.inputUsedInvitationCode =apiServer.invitationcodecs+'/inputUsedInvitationCode?app_stoken='+app_stoken + getEnd;//认证邀请码cxr


//versioncs
apiUrl.upgradeVersion=apiServer.versioncs+'/upgradeVersion?sourcecode=0101010101&app_stoken='+app_stoken;//检查更新


//help
//apiUrl.knowledgepointcs = 'http://myportal.tf56.com/knowledge/knowledgepointcs/selectKnowledgePointByConditions';
apiUrl.knowledgepointcs = apiServer.knowledgecs+'/selectKnowledgePointByTag?app_stoken=' + app_stoken;
apiUrl.selectParentNodeByPrimaryKey = apiServer.knowledgecs+'/selectParentNodeByPrimaryKey?app_stoken=' + app_stoken;

