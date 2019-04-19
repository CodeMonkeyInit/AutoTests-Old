let custom = {
        advert: () => ({
            title: {
                type: 'text',
                default: 'Новое объявление ' + Math.random()
            },
            number: {
                type: 'text',
                default: '+79788016407',
            },
            text: {
                type: 'textarea',
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            },
            tags: {
                type: 'text',
                default: 'tag1, tag2, tag3',
            },
            image: {
                type: 'file'
            }
        })
    };
let customResponse = {
    unauthorized: (result, status) => {
        if(status.status == 401 && status.statusText.toLowerCase() == 'unauthorized') {
            if(typeof result.message == 'string') {
                if(result.message.toLowerCase() == 'unauthorized') {
                    return true;
                }
            }
        }

        return false;
    }
};
let tests = {
    cat1: {
        name: 'Авторизация',
        items: {
            authorize1: {
                name: 'Авторизация: запрос выполняется на адрес',
                subname: 'Адрес существует, нет ошибки 404',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (status.status !== 404 && status.status != 403 && status.status != 500) {
                        return true;
                    }

                    return false;
                },
            },
            authorize2: {
                name: 'Авторизация: успешная, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (status.status == 200) {
                        return true;
                    }

                    return false;
                },
            },
            authorize3: {
                name: 'Авторизация: успешная, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'successful authorization') {
                        return true;
                    }

                    return false;
                },
            },
            authorize4: {
                name: 'Авторизация: успешная, верный body-параметр: status',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (result.status == true) {
                        return true;
                    } else if (typeof result.status == 'string') {
                        if (result.status == "true") {
                            return true;
                        }
                    }

                    return false;
                },
            },
            authorize5: {
                name: 'Авторизация: успешная, верный body-параметр: token',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (typeof result.token == 'string') {
                        if (result.token.length > 0) {
                            return true;
                        }
                    }

                    return false;
                },
            },
            authorize6: {
                name: 'Авторизация: безуспешная, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin1231231',
                        password: 'sakhasdfasdfasdfalin2018'
                    }
                },
                test: (result, status) => {
                    if (status.status == 401) {
                        return true;
                    }

                    return false;
                },
            },
            authorize7: {
                name: 'Авторизация: безуспешная, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admi231231',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'invalid authorization data') {
                        return true;
                    }

                    return false;
                },
            },
            authorize8: {
                name: 'Авторизация: безуспешная, верный body-параметр: status',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {
                        login: 'admin1231',
                        password: 'sakhalin2018'
                    }
                },
                test: (result, status) => {
                    if (result.status == false || result.status == 'false') {
                        return true;
                    }

                    return false;
                },
            },
            authorize9: {
                name: 'Авторизация: безуспешная, верный body-параметр: message',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'auth',
                    data: {}
                },
                test: (result, status) => {
                    if (result.message) {
                        if (result.message.toLowerCase() == 'invalid authorization data') {
                            return true;
                        }
                    }

                    return false;
                },
            },
        },
    },
    cat2: {
        name: 'Создание обьявления',
        items: {
            create1: {
                name: 'Создание обьявления: запрос выполняется на адрес',
                subname: 'Адрес существует, нет ошибки 404',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: {}
                },
                test: (result, status) => {
                    if (status.status !== 404 && status.status != 403 && status.status != 500) {
                        return true;
                    }

                    return false;
                },
            },
            create2: {
                name: 'Создание обьявления: успешное, верный status-параметр: code',
                subname: '',
                custom: true,
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (status.status == 201) {
                        return true;
                    }

                    return null;
                },
            },
            create3: {
                name: 'Создание обьявления: успешное, верный status-параметр: text',
                subname: '',
                custom: true,
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'successful creation') {
                        return true;
                    }

                    return null;
                },
            },
            create4: {
                name: 'Создание обьявления: успешное, верный body-параметр: status',
                subname: '',
                custom: true,
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (result.status == true) {
                        return true;
                    }

                    return null;
                },
            },
            create5: {
                name: 'Создание обьявления: успешное, верный body-параметр: advert_id',
                subname: '',
                custom: true,
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (result.advert_id) {
                        return true;
                    }

                    return null;
                },
            },
            create6: {
                name: 'Создание обьявления: объявление добавлено',
                subname: '',
                custom: true,
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    return null;
                },
            },
            create7: {
                name: 'Создание обьявления: безуспешное, верный body-параметр: status',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: {},
                },
                test: (result, status) => {
                    if(result.status == false || result.status == 'false') {
                        return true;
                    }

                    return false;
                },
            },
            create8: {
                name: 'Создание обьявления: безуспешное, верный body-параметр: message',
                subname: 'Содержит ассоциативный массив из параметров, которые содержат ошибку. Оценивается в целом формат вывода',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: {},
                },
                test: (result, status) => {
                    if(typeof result.message == 'array' || typeof result.message == 'object') {
                        return true;
                    }

                    return false;
                },
            },
            create9: {
                name: 'Создание обьявления: валидация: title, number, text, image. Изображение загружается на сервер',
                subname: 'Все критерии проверяются на этой форме поочерёдно',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if(typeof result.message == 'array' || typeof result.message == 'object') {
                        return true;
                    }

                    return false;
                },
            },
            create10: {
                name: 'Создание обьявления: ошибка авторизации: верный ответ',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts',
                    data: {},
                },
                test: customResponse.unauthorized,
            },
        }
    },
    cat3: {
        name: 'Редактирование обьявления',
        items: {
            edit1: {
                name: 'Редактирование обьявления: успешное, верный status-параметр: code',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (status.status == 201) {
                        return true;
                    }

                    return null;
                },
            },
            edit2: {
                name: 'Редактирование обьявления: успешное, верный status-параметр: text',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'successful creation') {
                        return true;
                    }

                    return null;
                },
            },
            edit3: {
                name: 'Редактирование обьявления: успешное, верный body-параметр: status',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (result.status == true || result.status == 'true') {
                        return true;
                    }

                    return null;
                }
            },
            edit4: {
                name: 'Редактирование обьявления: успешное, верный body-параметр: advert',
                subname: 'title - название обьявления: 0,01;\n' +
                ' datatime - дата и время создания обьявления: 0,02;\n' +
                ' формат - чч:мм дд.мм.гггг (12:35 06.08.2018): 0,2;\n' +
                ' number - номер обьявления: 0,01;\n' +
                ' text - текст обьявления: 0,01;\n' +
                ' tags - массив из тэгов обьявления ([“tag1”, “tag2”]): 0,3;\n' +
                ' image - ссылка на изображение обьявления: 0,2',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (result.advert) {
                        return null;
                    }

                    return false;
                }
            },
            edit5: {
                name: 'Редактирование обьявления: успешное: валидация осуществляется на все поля',
                subname: 'title - уникальное: 0,1;\nimage - форматы: jpg, png, размер: 0,2',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: custom.advert(),
                },
                test: (result, status) => {
                    if (result.advert) {
                        return null;
                    }

                    return false;
                }
            },
            edit6: {
                name: 'Редактирование обьявления: безуспешное, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.status == 400) {
                        return true;
                    }

                    return false;
                }
            },
            edit7: {
                name: 'Редактирование обьявления: безуспешное, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'editing error') {
                        return true;
                    }

                    return false;
                }
            },
            edit8: {
                name: 'Редактирование обьявления: безуспешное, верный body-параметр: status',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (result.status == false || result.status == 'false') {
                        return true;
                    }

                    return false;
                }
            },
            edit9: {
                name: 'Редактирование обьявления: безуспешное, верный body-параметр: message',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (typeof result.message == 'object') {
                        return true;
                    }

                    return false;
                }
            },
            edit10: {
                name: 'Редактирование обьявления: несуществующий, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            edit11: {
                name: 'Редактирование обьявления: несуществующий, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'advert not found') {
                        return true;
                    }

                    return false;
                }
            },
            edit12: {
                name: 'Редактирование обьявления: несуществующий, верный body-параметр: message',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'advert not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            edit13: {
                name: 'Редактирование обьявления: ошибка авторизации: верный ответ',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: customResponse.unauthorized,
            },
        }
    },
    cat4: {
        name: 'Удаление обьявления',
        items: {
            delete1: {
                name: 'Удаление обьявления: успешное, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    if(status.status == 201) {
                        return true;
                    }

                    return false;
                },
            },
            delete2: {
                name: 'Удаление обьявления: успешное, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    try {
                        if (status.statusText.toLowerCase() == 'successful delete') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                },
            },
            delete3: {
                name: 'Удаление обьявления: успешное, верный body-параметр: status',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    try {
                        if (result.status == true || result.status == 'true') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                },
            },
            delete4: {
                name: 'Удаление обьявления: удален',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    },
                    data: {},
                },
                test: (result, status) => {
                    return null;
                },
            },
            delete5: {
                name: 'Удаление обьявления: несуществующий, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            delete6: {
                name: 'Удаление обьявления: несуществующий, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'advert not found') {
                        return true;
                    }

                    return false;
                }
            },
            delete7: {
                name: 'Удаление обьявления: несуществующий, верный body-параметр: message',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'advert not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            delete8: {
                name: 'Удаление обьявления: ошибка авторизации: верный ответ',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                    data: {},
                },
                test: customResponse.unauthorized,
            },
        }
    },
    cat5: {
        name: 'Просмотр всех записей',
        items: {
            see1: {
                name: 'Просмотр всех записей: верный status-параметр: code',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts',
                },
                test: (result, status) => {
                    try {
                        if (status.status == 200) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            see2: {
                name: 'Просмотр всех записей: верный status-параметр: text',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts',
                },
                test: (result, status) => {
                    try {
                        if (status.statusText.toLowerCase() == 'list adverts') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            see3: {
                name: 'Просмотр всех записей: верный ответ',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts',
                },
                test: (result, status) => {
                    return null;
                }
            },
            see4: {
                name: 'Просмотр одной записи: верный status-параметр: code',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    }
                },
                test: (result, status) => {
                    try {
                        if (status.status == 200) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            see5: {
                name: 'Просмотр одной записи: верный status-параметр: text',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    }
                },
                test: (result, status) => {
                    try {
                        if (status.statusText.toLowerCase() == 'view advert') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            see6: {
                name: 'Просмотр одной записи: верный ответ',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 1
                    }
                },
                test: (result, status) => {
                    return null;
                }
            },
            see7: {
                name: 'Просмотр одной записи: несуществующая, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            see8: {
                name: 'Просмотр одной записи: несуществующая, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'advert not found') {
                        return true;
                    }

                    return false;
                }
            },
            see9: {
                name: 'Просмотр одной записи: несуществующая, верный body-параметр: message',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'GET',
                    link: 'adverts/{ID}',
                    customLink: {
                        ID: 121321321
                    },
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'advert not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
        }
    },
    cat6: {
        name: 'Добавление комментария',
        items: {
            add1: {
                name: 'Добавление комментария: успешное, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: 'Author 1',
                        comment: 'Comment for advert 1'
                    }
                },
                test: (result, status) => {
                    try {
                        if (status.status == 201) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add2: {
                name: 'Добавление комментария: успешное, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: 'Author 2',
                        comment: 'Comment for advert 2'
                    }
                },
                test: (result, status) => {
                    try {
                        if (status.status == 201) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add3: {
                name: 'Добавление комментария: успешное, верный body-параметр: status',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: 'Author 3',
                        comment: 'Comment for advert 3'
                    }
                },
                test: (result, status) => {
                    try {
                        if (result.status == true || result.status == 'true') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add4: {
                name: 'Добавление комментария: комментарий добавлен',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: 'Author 4',
                        comment: 'Comment for advert 4'
                    }
                },
                test: (result, status) => {
                    return null;
                }
            },
            add5: {
                name: 'Добавление комментария: валидация: author',
                subname: 'для гостя не пустое: 0,1;\n' +
                ' для администратора не обязательное: 0,1',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: {
                            type: 'text'
                        },
                        comment: {
                            type: 'text',
                            default: 'Comment'
                        }
                    }
                },
                test: (result, status) => {
                    return null;
                }
            },
            add6: {
                name: 'Добавление комментария: валидация: comment',
                subname: '"не пустое: 0,05;\n' +
                ' максимум 255 символов: 0,1"\n',
                bearerEnabled: true,
                bearer: '',
                custom: true,
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {
                        author: {
                            type: 'text'
                        },
                        comment: {
                            type: 'text',
                            default: 'Comment'
                        }
                    }
                },
                test: (result, status) => {
                    return null;
                }
            },
            add7: {
                name: 'Добавление комментария: безуспешное, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {}
                },
                test: (result, status) => {
                    try {
                        if(status.status == 400) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add8: {
                name: 'Добавление комментария: безуспешное, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {}
                },
                test: (result, status) => {
                    try {
                        if(status.statusText.toLowerCase() == 'creating error') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add9: {
                name: 'Добавление комментария: безуспешное, верный body-параметр: status',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {}
                },
                test: (result, status) => {
                    try {
                        if(result.status == false || result.status == 'false') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            add10: {
                name: 'Добавление комментария: безуспешное, верный body-параметр: message',
                subname: 'Отправлять не авторизованым',
                request: {
                    method: 'POST',
                    link: 'adverts/{ID}/comments',
                    customLink: {
                        ID: 1
                    },
                    data: {}
                },
                test: (result, status) => {
                    try {
                        if(typeof result.message.author != 'undefined' && typeof result.message.comment != 'undefined') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            edit10: {
                name: 'Добавление комментария: несуществующее обьявление, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/12312321/comments',
                    data: {},
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            edit11: {
                name: 'Добавление комментария: несуществующее обьявление, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/12312321/comments',
                    data: {},
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'advert not found') {
                        return true;
                    }

                    return false;
                }
            },
            edit12: {
                name: 'Добавление комментария: несуществующее обьявление, верный body-параметр: message',
                subname: '',
                request: {
                    method: 'POST',
                    link: 'adverts/12321321/comments',
                    data: {},
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'advert not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
        }
    },
    cat7: {
        name: 'Удаление комментария',
        items: {
            del1: {
                name: 'Удаление комментария: успешное, верный status-параметр: code',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    try {
                        if (status.status == 201) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            del2: {
                name: 'Удаление комментария: успешное, верный status-параметр: text',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    try {
                        if (status.status == 201) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            del3: {
                name: 'Удаление комментария: успешное, верный body-параметр: status',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    try {
                        if (result.status == true || result.status == 'true') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            del4: {
                name: 'Удаление комментария: удален',
                subname: '',
                bearerEnabled: true,
                bearer: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    return null;
                }
            },
            del5: {
                name: 'Удаление комментария: несуществующее обьявление, верный status-параметр: code',
                subname: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            del6: {
                name: 'Удаление комментария: несуществующее обьявление, верный status-параметр: text',
                subname: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'advert not found') {
                        return true;
                    }

                    return false;
                }
            },
            del7: {
                name: 'Удаление комментария: несуществующее обьявление, верный body-параметр: message',
                subname: '',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'advert not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            del8: {
                name: 'Удаление комментария: несуществующий комментарий, верный status-параметр: code',
                subname: '',
                bearer: '',
                bearerEnabled: true,
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/2133333',
                    customLink: {
                        ID: 1,
                    },
                },
                test: (result, status) => {
                    if (status.status == 404) {
                        return true;
                    }

                    return false;
                }
            },
            del9: {
                name: 'Удаление комментария: несуществующий комментарий, верный status-параметр: text',
                subname: '',
                bearer: '',
                bearerEnabled: true,
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/123123312',
                    customLink: {
                        ID: 1,
                    },
                },
                test: (result, status) => {
                    if (status.statusText.toLowerCase() == 'comment not found') {
                        return true;
                    }

                    return false;
                }
            },
            del10: {
                name: 'Удаление комментария: несуществующий комментарий, верный body-параметр: message',
                subname: '',
                bearer: '',
                bearerEnabled: true,
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/21312332',
                    customLink: {
                        ID: 1,
                    },
                },
                test: (result, status) => {
                    try {
                        if (typeof result.message != 'undefined') {
                            if (result.message.toLowerCase() == 'comment not found') {
                                return true;
                            }
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            del11: {
                name: 'Удаление комментария: ошибка авторизации: верный ответ',
                subname: 'Два варианта: оставить пустым и ввести неверный',
                request: {
                    method: 'DELETE',
                    link: 'adverts/{ID}/comments/{COMMENT_ID}',
                    customLink: {
                        ID: 1,
                        COMMENT_ID: 1,
                    },
                },
                test: customResponse.unauthorized,
            },
        }
    },
    cat8: {
        name: 'Поиск по тегу',
        items: {
            search1: {
                name: 'Поиск по тегу: верный status-параметр: code\n',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts/tag/{TAG}',
                    customLink: {
                        TAG: 'tag',
                    },
                },
                test: (result, status) => {
                    try {
                        if (status.status == 200) {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            search2: {
                name: 'Поиск по тегу: верный status-параметр: text',
                subname: '',
                request: {
                    method: 'GET',
                    link: 'adverts/tag/{TAG}',
                    customLink: {
                        TAG: 'tag',
                    },
                },
                test: (result, status) => {
                    try {
                        if (status.statusText.toLowerCase() == 'found adverts') {
                            return true;
                        }
                    } catch (e) {
                    }

                    return false;
                }
            },
            search3: {
                name: 'Поиск по тегу: верный формат ответа, верный ответ',
                subname: 'Оцениваются два критерия',
                request: {
                    method: 'GET',
                    link: 'adverts/tag/{TAG}',
                    customLink: {
                        TAG: 'tag',
                    },
                },
                test: (result, status) => {
                    return null;
                }
            },
        }
    }
};