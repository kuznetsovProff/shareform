// кнопки иконки
let json_menu =	`{
				  "menuon": "true",
				  "buttons": {
					  "btnprint": {	"title": "Печать", "fntawesome": "fas fa-print"	},
					  "btnlink": { "title": "Копировать ссылку", "fntawesome": "fas fa-link" },
					  "btnshare": { "title": "Поделиться ссылкой", "fntawesome": "fas fa-share" }
				  }
				}`;
let json_form = `
				{
					"ver": "0.0.0 b",
					"title": "Заявление о возбуждении исполнительного производства",
					"sets": [],
					"scs": [
						{"id": "sc1", "cls": "",
							"cols": [
								{"id": "sc1_col1", "cls": "",
									"ps": []
								},
								{"id": "sc1_col2", "cls": "",
									"ps": [
										{"id": "sc1_col1_p1", "cls": "text-left",
											"ss": [
												{
													"txt": "В "
												},
												{"id": "ospname", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(наименование отдела судебных приставов)"
												}
												
											]
										},
										{"cls": "emptyline"},
										{"id": "sc1_col1_p2",
											"cls": "text-left",
											"ss": [
												{
													"txt": "от "
												},
												{"id": "claimantname", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(ФИО взыскателя)"
												}
												
											]
										},
										{"id": "sc1_col1_p3", "cls": "text-left",
											"ss": [
												{													
													"txt": "адрес: "
												},
												{ "id": "claimantaddress", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(адрес взыскателя)"
												}
												
											]
										},
										{"id": "sc1_col1_p4", "cls": "text-left",
											"ss": [
												{
													"txt": "телефон: "
												},
												{"id": "claimantphone", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(телефон взыскателя)"
												}
												
											]
										},
										{"cls": "emptyline"},
										{"cls": "emptyline"}
													
									]
								}
							]
						},
						{"id": "sc2", "cls": "",
							"cols": [
								{"id": "sc2_col1", "cls": "",
									"ps": [
										{"id": "sc2_col1_p1", "cls": "text-center",
											"ss": [
												{
													"cls": "font-weight-bold",
													"html": "ЗАЯВЛЕНИЕ<br>о возбуждении исполнительного производства"
												}
											]
										},
										{"cls": "emptyline"},
										{"cls": "emptyline"},
										{"id": "sc2_col1_p2", "cls": "text-justify text-indent",
											"ss": [
												{"id": "docdate", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "«___»_________ ____ г. (дата выдачи исполнительного документа)"
												},
												{
													"txt": " по делу "
												},
												{"id": "casenum", "cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(указать наименование дела; его можно посмотреть в шапке исполнительного документа)"
												},
												{
													"txt": " "
												},
												{"id": "courtname", "cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(наименование суда, выдавшего исполнительный документ)"
												},
												{
													"txt": " выдал "
												},
												{"type": "select","id": "doctype_picker", "cls":"selectpicker", "changec":"#doctype",
													"subs":[
														{
															"type": "option",
															"txt": "исполнительный лист"
														},
														{
															"type": "option",
															"txt": "судебный приказ"
														}
													]
												},
												{
													"txt": " "
												},
												{"id": "doctype", "cls":"divhidden",
													"txt":"исполнительный лист"
													
												},
												{"id": "docnum", "cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(номер исполнительного документа)"
												},
												{
													"txt": " в отношении должника "
												},
												{"id": "debtor", "cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "(ФИО должника, дата и место рождения, его место жительства или место пребывания, телефон, место работы / наименование должника, ИНН, ОГРН, адрес регистрации, фактический адрес)"
												},
												{
													"txt": "."
												}
											]
											
										},
										{"id": "sc2_col1_p3", "cls": "text-justify text-indent",
											"ss": [
												{"id": "history", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "Ранее по данному исполнительному документу исполнительное производство не возбуждалось (если возбуждалось, указать, когда возбуждалось, когда окончено и почему, какие исполнительные действия выполнены, сколько денег было взыскано, какое имущество передано)."
												},	{"id":"historyswitch","close":"false","control":"#history",
													"subs":[
														{"type":"i","cls":"no-print fas fa-chevron-left"}
													]
												}
											]
										},
										{"id": "sc2_col1_p4", "cls": "text-justify text-indent",
											"ss": [
												{"id": "addinfo", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "Дополнительно сообщаю известные мне сведения о должнике и его имуществе: (указать все известные сведения о должнике и его имуществе, которые могут помочь в исполнении судебного постановления)."
												},	{"id":"addinfoswitch","close":"false","control":"#addinfo",
													"subs":[
														{"type":"i","cls":"no-print fas fa-chevron-left"}
													]
												}
											]
										},
										{"id": "sc2_col1_p5", "cls": "text-justify text-indent",
											"ss": [
												{"id": "propertylist", "cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "В целях обеспечения исполнения требований, содержащихся в исполнительном документе, одновременно с возбуждением исполнительного производства необходимо решить вопрос о наложении ареста на имущество должника (при наличии сведений перечислить имущество, на которое должен быть наложен арест), поскольку должник может принять меры для сокрытия своего имущества."
												},	{"id":"propertylistswitch","close":"false","control":"#propertylist",
													"subs":[
														{"type":"i","cls":"no-print fas fa-chevron-left"}
													]
												}
											]
										},
										{"id": "sc2_col1_p6", "cls": "text-justify text-indent no-reformat",
											"ss": [
												{ "txt":"На основании изложенного, руководствуясь " },
												{ 
													"type":"a","href":"https://yandex.ru/search/?text=статья%2030%20ФЗ%20РФ%20об%20исполнительном%20производстве","target":"_blank",
													"txt":"статьей 30 Федерального закона «Об исполнительном производстве»"
												},
												{ "txt":"," }
											]
										},
										{"cls": "emptyline"},
										{"id": "sc2_col1_p7", "cls": "text-center",
											"ss": [
												{ 
													"cls":"font-weight-bold",
													"txt":"ПРОШУ:" 
												}
											]
										},
										{"id": "sc2_col1_p8", "cls": "text-justify text-indent",
											"ss": [
												{
													"id":"requestforenforcement",
													"cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "1. Возбудить исполнительное производство.",
													"txt": "1. Возбудить исполнительное производство."
												}
											]
										},
										{"id": "sc2_col1_p9", "cls": "text-justify text-indent",
											"ss": [
												{
													"id":"seizurerequest",
													"cls":"bg-warning-opacity-10",
													"editable": "true",
													"pholder": "2. Наложить арест на имущество должника."
												},
												{"id":"seizurerequestswitch","close":"false","control":"#seizurerequest",
													"subs":[
														{"type":"i","cls":"no-print fas fa-chevron-left"}
													]
												}
											]
										},
										{"cls": "emptyline"},
										{"id": "sc2_col1_p10", "cls": "text-justify text-indent",
											"ss": [
												{
													"cls": "font-weight-bold",
													"txt": "Приложения:"
												}
											]
										},
										{"id": "sc2_col1_p11", "cls": "text-justify text-indent",
											"ss": [
												{
													"id": "attachment1",
													"cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "1. Исполнительный документ.",
													"txt": "1. Исполнительный документ."
												}
											]
										},
										{"id": "sc2_col1_p12", "cls": "text-justify text-indent",
											"ss": [
												{
													"id": "attachment2",
													"cls": "bg-warning-opacity-10",
													"editable": "true",
													"pholder": "2. Документы, содержащие информацию о должнике, его имущественном положении и иные сведения, которые могут иметь значение для своевременного и полного исполнения требований исполнительного документа."
												},
												{"id":"attachment2switch","close":"false","control":"#attachment2",
													"subs":[
														{"type":"i","cls":"no-print fas fa-chevron-left"}
													]
												}
											]
										},
										{"cls": "emptyline"},										{"id": "sc2_col1_p13", "cls": "text-right text-indent",
											"ss": [
												{
													"cls": "font-weight-bold",
													"txt": "Дата подачи заявления "
												},
												{
													"id": "filingdate",
													"cls": "font-weight-bold",
													"txt": "«___»_________ ____ г."
												}
											]
										},
										{"cls": "emptyline"},										{"id": "sc2_col1_p14", "cls": "text-right text-indent",
											"ss": [
												{
													"cls": "font-weight-bold",
													"txt": "Подпись ______________"
												}
											]
										},
										{"cls": "emptyline"}
									]
								}
							]
						},
						{"id": "footer_content", "cls": "container-fluid downjumbo no-print text-center", "parentid": "#footer",
							"cols": [
								{"id": "footer_content_col1", "cls": "margin-bottom:0",
									"ps": [
										{
											"id":"wa",
											"cls":"whatsappme",
											"ss": [
												{
													"type":"a",
													"id":"whatsapplink",
													"cls":"text-success",
													"datatoggle":"tooltip",
													"dataplacement":"top",
													"title":"Написать автору в WhatsApp",
													"href":"http://wa.me/+79265729463",
													"subs":[
														{
															"type":"i",
															"cls":"fab fa-whatsapp"
														},
														{
															"type":"span",
															"txt":" Алексей Кузнецов"
														}
													]
												}
											]
										}
									]
								}
							]
						}
						
					]
				}
				`;
