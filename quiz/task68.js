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
					"title": "Тестовые задания на присвоение статуса адвоката",
					"sets": [],
					"scs": [
						{"id": "sc1", "cls": "",
							"cols": [
								{"id": "sc1_col1", "cls": "",
									"ps": [
										{"id": "sc1_col1_p1", "cls": "text-center",
											"ss": [
												{
													"cls": "font-weight-bold",
													"html": "Задание № 68"
												}
											]
										},
										{"cls": "emptyline"},
										{"id": "sc1_col1_p2", "cls": "text-justify text-indent",
											"ss": [
												{"id": "question1", "cls": "",
													"txt": "Территориальный орган юстиции направляет в адвокатскую палату копию реестра адвокатов субъектов Российской Федерации ежегодно не позднее:"
												}
											]
										},
										{"cls": "emptyline"},
										{"id": "sc1_col1_p3", "cls": "text-center text-indent",
											"ss": [
												{"id": "task1", "cls": "font-italic",
													"txt": "Выберите один из 4 вариантов ответа:"}
											]
										},
										{"cls": "emptyline"},
										{
											"id": "customformradio68_1",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option1",
													"id": "customradio68_1",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_1",
													"txt": "1 января"
												}
											]											
										},
										{
											"id": "customformradio68_2",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option2",
													"id": "customradio68_2",
													"answer": "true"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_2",
													"txt": "1 февраля"
												}
											]											
										},
										{
											"id": "customformradio68_3",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option3",
													"id": "customradio68_3",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_3",
													"txt": "1 марта"
												}
											]											
										},
										{
											"id": "customformradio68_4",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option4",
													"id": "customradio68_4",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_4",
													"txt": "1 декабря"
												}
											]											
										},
										{"cls": "emptyline"},
										{"id": "buttons68", "cls": "text-right",
											"ss": [
												{"id": "checkbutton68", "type":"button", "itype":"button", "cls": "btn btn-primary buttoncheck", "disabled": "disabled", "for": "customradio68",
													"txt": "Проверить"},
												{													
													"txt": " "
												},
												{"id": "buttonnext", "type":"button", "itype":"button", "cls": "btn btn-secondary buttonnext", "disabled": "disabled",
													"txt": "Далее"}
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
/*
{"cls": "emptyline"},

										{"cls": "emptyline"},
										
										
										{
											"id": "customformradio68_1",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option1",
													"id": "customradio68_1",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_1",
													"txt": "1 января"
												}
											]											
										},
										{
											"id": "customformradio68_2",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option2",
													"id": "customradio68_2",
													"answer": "true"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_2",
													"txt": "1 февраля"
												}
											]											
										},
										{
											"id": "customformradio68_3",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option3",
													"id": "customradio68_3",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_3",
													"txt": "1 марта"
												}
											]											
										},
										{
											"id": "customformradio68_4",
											"cls": "custom-control custom-radio",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "radio",
													"name": "customradio68",
													"value": "option4",
													"id": "customradio68_4",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customradio68",
													"for": "customradio68_4",
													"txt": "1 декабря"
												}
											]											
										},
										
										
										
																				{
											"id": "formcustomcheck68_1",
											"cls": "custom-control custom-checkbox",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "checkbox",
													"name": "customcheck68",
													"value": "",
													"id": "customcheck68_1",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customcheck68",
													"for": "customcheck68_1",
													"txt": "1 января"
												}
											]											
										},
										{
											"id": "formcustomcheck68_2",
											"cls": "custom-control custom-checkbox",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "checkbox",
													"name": "customcheck68",
													"value": "",
													"id": "customcheck68_2",
													"answer": "true"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customcheck68",
													"for": "customcheck68_2",
													"txt": "1 февраля"
												}
											]											
										},
										{
											"id": "formcustomcheck68_3",
											"cls": "custom-control custom-checkbox",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "checkbox",
													"name": "customcheck68",
													"value": "",
													"id": "customcheck68_3",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customcheck68",
													"for": "customcheck68_3",
													"txt": "1 марта"
												}
											]											
										},
										{
											"id": "formcustomcheck68_4",
											"cls": "custom-control custom-checkbox",
											"ss": [
												{
													"type": "input",
													"cls": "custom-control-input",
													"itype": "checkbox",
													"name": "customcheck68",
													"value": "",
													"id": "customcheck68_4",
													"answer": "false"
												},
												{
													"type": "label",
													"cls": "custom-control-label",
													"name": "customcheck68",
													"for": "customcheck68_4",
													"txt": "1 декабря"
												}
											]											
										},
*/