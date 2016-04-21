(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
var AlertView, Application,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AlertView = require('views/alert-view');

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.start = function() {
    Application.__super__.start.apply(this, arguments);
    return this.subscribeEvent("!application:showAlert", this.showAlertMessage);
  };

  Application.prototype.showAlertMessage = function(messageData) {
    var opts_;
    opts_ = {
      text: ' ',
      type: 'information',
      layout: 'center',
      theme: 'relax',
      timeout: 1500
    };
    _.extend(opts_, messageData);
    return noty(opts_);
  };

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Controller, SiteView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SiteView = require('views/site-view');

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.beforeAction = function() {
    $.noty.closeAll();
    return this.reuse('site', SiteView);
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/home-controller", function(exports, require, module) {
var Controller, HeaderView, HomeController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    return HomeController.__super__.constructor.apply(this, arguments);
  }

  HomeController.prototype.beforeAction = function() {
    HomeController.__super__.beforeAction.apply(this, arguments);
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  HomeController.prototype.index = function() {
    return this.view = new HomePageView({
      region: 'main'
    });
  };

  return HomeController;

})(Controller);
});

;require.register("controllers/scan-controller", function(exports, require, module) {
var Controller, HeaderView, ScanPageView, TablesController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

ScanPageView = require('views/scan/scan-view');

module.exports = TablesController = (function(_super) {
  __extends(TablesController, _super);

  function TablesController() {
    return TablesController.__super__.constructor.apply(this, arguments);
  }

  TablesController.prototype.beforeAction = function() {
    TablesController.__super__.beforeAction.apply(this, arguments);
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  TablesController.prototype.index = function(params) {
    return this.indexView = new ScanPageView({
      containerMethod: 'html',
      region: 'main'
    });
  };

  return TablesController;

})(Controller);
});

;require.register("controllers/setup-controller", function(exports, require, module) {
var Controller, HeaderView, SetupController, SetupModel, SetupPageView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

SetupPageView = require('views/setup/setup-view');

SetupModel = require('models/setup/setup-model');

module.exports = SetupController = (function(_super) {
  __extends(SetupController, _super);

  function SetupController() {
    return SetupController.__super__.constructor.apply(this, arguments);
  }

  SetupController.prototype.beforeAction = function() {
    SetupController.__super__.beforeAction.apply(this, arguments);
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  SetupController.prototype.show = function() {
    this.setupModel = new SetupModel;
    this.setupModel.fetch();
    return this.view = new SetupPageView({
      region: 'main',
      model: this.setupModel
    });
  };

  SetupController.prototype.checkSetup = function() {
    return Q.fcall(function() {
      return true;
    });
  };

  return SetupController;

})(Controller);
});

;require.register("initialize", function(exports, require, module) {
var Application, Utils, routes;

Application = require('application');

routes = require('routes');

Utils = require('lib/utils');

$(function() {
  $.fn.onTypeFinished = Utils.onTypeFinished;
  FastClick.attach(document.body);
  return i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    ns: {
      namespaces: ['app'],
      defaultNs: 'app'
    }
  }, function() {
    numeral.language('en');
    return new Application({
      title: 'Web Scanner',
      controllerSuffix: '-controller',
      routes: routes
    });
  });
});
});

;require.register("lib/scanner", function(exports, require, module) {
module.exports = {

  /**
    Request scan preview 
  @method preview
   */
  preview: function() {
    var deferred, xhr;
    deferred = Q.defer();
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      var imageUrl, url;
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          url = window.URL || window.webkitURL;
          imageUrl = url.createObjectURL(this.response);
          return deferred.resolve(imageUrl);
        } else {
          return deferred.reject(this.statusText);
        }
      }
    };
    xhr.open('GET', "/api/preview");
    xhr.responseType = 'blob';
    xhr.send();
    return deferred.promise;
  },

  /**
    Request scan and send image download
  @method scan
   */
  scan: function(options) {
    if (options == null) {
      options = {};
    }
    if (options.fileName != null) {
      window.location.assign("/api/scan?fileName=" + options.fileName);
    } else {
      window.location.assign("/api/scan");
    }
    return Q();
  }
};
});

;require.register("lib/utils", function(exports, require, module) {
var capitalize_, pluralize_, translate_, utils;

utils = Chaplin.utils.beget(Chaplin.utils);

translate_ = function(str, opts) {
  return i18n.t(str, opts);
};

capitalize_ = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

pluralize_ = function(str) {
  return translate_(str, {
    context: "plural"
  });
};

_.extend(utils, {
  onTypeFinished: function(func) {
    var D, S, T, onKeyPress, onTimeOut;
    onKeyPress = function() {
      var D, S, T, t;
      clearTimeout(T);
      if (S === 0) {
        S = new Date().getTime();
        D = 1000;
        T = setTimeout(onTimeOut, 1000);
        return;
      }
      t = new Date().getTime();
      D = (D + (t - S)) / 2;
      S = t;
      return T = setTimeout(onTimeOut, D * 2);
    };
    onTimeOut = function() {
      var S;
      func.apply();
      return S = 0;
    };
    T = undefined;
    S = 0;
    D = 1000;
    $(this).bind("keydown", onKeyPress);
    return this;
  },
  naturalCmp: function(str1, str2) {
    var a, b, cmpRegex, count, i, num1, num2, tokens1, tokens2;
    if (str1 === str2) {
      return 0;
    }
    if (!str1) {
      return -1;
    }
    if (!str2) {
      return 1;
    }
    cmpRegex = /(\.\d+)|(\d+)|(\D+)/g;
    tokens1 = String(str1).match(cmpRegex);
    tokens2 = String(str2).match(cmpRegex);
    count = Math.min(tokens1.length, tokens2.length);
    i = 0;
    while (i < count) {
      a = tokens1[i];
      b = tokens2[i];
      if (a !== b) {
        num1 = +a;
        num2 = +b;
        if (num1 === num1 && num2 === num2) {
          if (num1 > num2) {
            return 1;
          } else {
            return -1;
          }
        }
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      }
      i++;
    }
    if (tokens1.length !== tokens2.length) {
      return tokens1.length - tokens2.length;
    }
    if (str1 < str2) {
      return -1;
    } else {
      return 1;
    }
  },
  i18n_: function(op, str, options) {
    var c, p, plural_, t, translation;
    if (options == null) {
      options = {};
    }
    t = op.indexOf("t");
    p = op.indexOf("p");
    c = op.indexOf("c");
    translation = translate_(str, options);
    if (p > -1) {
      plural_ = pluralize_(str);
      if (plural_ != null) {
        translation = plural_;
      }
    }
    if (c > -1) {
      translation = capitalize_(translation);
    }
    return translation;
  }
});

if (typeof Object.seal === "function") {
  Object.seal(utils);
}

module.exports = utils;
});

;require.register("lib/view-helper", function(exports, require, module) {
var register, utils,
  __slice = [].slice;

utils = require('./utils');

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

register('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return utils.reverse(routeName, params);
});

register('capitalize', function() {
  var options, params, str, _i;
  str = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  return str;
});

register("i18n_", function(op, str, options) {
  return utils.i18n_(op, str, options);
});

register("numeral_", function(number, format, options) {
  return numeral(number).format(format);
});
});

;require.register("mediator", function(exports, require, module) {
var mediator;

mediator = module.exports = Chaplin.mediator;
});

;require.register("models/base/collection", function(exports, require, module) {
var Collection, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./model');

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  _(Collection.prototype).extend(Chaplin.SyncMachine);

  Collection.prototype.type = null;

  Collection.prototype.initialize = function() {
    Collection.__super__.initialize.apply(this, arguments);
    this.on('request', this.beginSync);
    this.on('sync', this.finishSync);
    return this.on('error', this.unsync);
  };

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);
});

;require.register("models/base/model", function(exports, require, module) {
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  _(Model.prototype).extend(Chaplin.SyncMachine);

  Model.prototype.idAttribute = "_id";

  Model.prototype.accessors = null;

  Model.prototype.type = null;

  Model.prototype.getAttributes = function() {
    var data, fns, k, _i, _len;
    data = Chaplin.utils.beget(Model.__super__.getAttributes.apply(this, arguments));
    if (fns = this.accessors) {
      for (_i = 0, _len = fns.length; _i < _len; _i++) {
        k = fns[_i];
        data[k] = this[k].bind(this);
      }
    }
    return data;
  };

  Model.prototype.initialize = function() {
    Model.__super__.initialize.apply(this, arguments);
    this.save = _.debounce(this.save, 500);
    this.on('request', this.beginSync);
    this.on('sync', this.finishSync);
    this.on('error', this.unsync);
    return this.on('invalid', (function(_this) {
      return function(model, error) {
        return _this.publishEvent("!application:showAlert", {
          type: 'error',
          text: error
        });
      };
    })(this));
  };

  Model.prototype.parse = function(response, options) {
    if (response != null) {
      return _.omit(response, ['ok']);
    }
  };

  Model.prototype.get = function(attr) {
    if ((this.accessors != null) && this.accessors.indexOf(attr) > -1) {
      return this[attr]();
    } else {
      return Model.__super__.get.apply(this, arguments);
    }
  };

  Model.prototype.set = function(key, val, options) {
    var autoSave, opts;
    Model.__super__.set.apply(this, arguments);
    if (typeof val === 'object') {
      opts = val;
    } else {
      opts = options;
    }
    if (opts != null) {
      autoSave = opts.autoSave;
    }
    if (autoSave) {
      this.save(null, {
        error: (function(_this) {
          return function(model, response) {
            return _this.publishEvent("!application:showAlert", {
              type: 'error',
              timeout: 5000,
              text: response
            });
          };
        })(this)
      });
    }
    return this;
  };

  return Model;

})(Chaplin.Model);
});

;require.register("models/setup/setup-model", function(exports, require, module) {
var BaseModel, SetupModel, Utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseModel = require('models/base/model');

Utils = require('lib/utils');

module.exports = SetupModel = (function(_super) {
  __extends(SetupModel, _super);

  function SetupModel() {
    return SetupModel.__super__.constructor.apply(this, arguments);
  }

  SetupModel.prototype.idAttribute = '_id';

  SetupModel.prototype.initialize = function(attrs, options) {};

  SetupModel.prototype.url = function() {
    return '/api/setup';
  };

  return SetupModel;

})(BaseModel);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'scan#index');
  match('scan', 'scan#index');
  return match('setup', 'setup#show');
};
});

;require.register("views/alert-view", function(exports, require, module) {
var AlertView, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = AlertView = (function(_super) {
  __extends(AlertView, _super);

  AlertView.prototype.region = 'alerts';

  AlertView.prototype.template = require('./templates/alert');

  AlertView.prototype.autoRender = true;

  function AlertView(options) {
    if (options != null) {
      _.extend(this, _.pick(options, ['messageData']));
    }
    AlertView.__super__.constructor.apply(this, arguments);
  }

  AlertView.prototype.render = function() {
    AlertView.__super__.render.apply(this, arguments);
    setTimeout((function(_this) {
      return function() {
        return _this.dispose();
      };
    })(this), 10000);
    return this.$('.alert').on('closed.bs.alert', (function(_this) {
      return function() {
        return _this.dispose();
      };
    })(this));
  };

  AlertView.prototype.getTemplateData = function() {
    return this.messageData;
  };

  AlertView.prototype.dispose = function() {
    var prop, properties, _i, _len;
    if (this.disposed) {
      return;
    }
    properties = ['messageData'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];
      delete this[prop];
    }
    return AlertView.__super__.dispose.apply(this, arguments);
  };

  return AlertView;

})(View);
});

;require.register("views/base/collection-view", function(exports, require, module) {
var $, CollectionView, Utils, View, toggleElement,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

Utils = require('lib/utils');

$ = Backbone.$;

toggleElement = (function() {
  if ($) {
    return function(elem, visible) {
      return elem.toggle(visible);
    };
  } else {
    return function(elem, visible) {
      return elem.style.display = (visible ? '' : 'none');
    };
  }
})();

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  CollectionView.prototype.useCssAnimation = true;

  CollectionView.prototype.animationStartClass = 'animated fadeIn';

  CollectionView.prototype.animationEndClass = 'animated fadeIn';

  CollectionView.prototype.renderAnimation = 'fadeIn';

  CollectionView.prototype._rendered = false;

  CollectionView.prototype.searchFieldSelector = null;

  CollectionView.prototype.defaultFilterAttr = null;

  CollectionView.prototype.defaultFilterValue = null;

  function CollectionView(options) {
    var onScreenResize;
    if (options == null) {
      options = {};
    }
    this.saveScrollInfo = __bind(this.saveScrollInfo, this);
    this.filterFN = __bind(this.filterFN, this);
    if (this.searchFieldSelector != null) {
      this.events["keyup " + this.searchFieldSelector] = 'filterList';
    }
    if (this.renderAnimation != null) {
      if (options.className != null) {
        options.className = options.className + (" animated " + this.renderAnimation);
      } else {
        this.className = this.className + (" animated " + this.renderAnimation);
      }
    }
    if (options.defaultFilterValue != null) {
      this.defaultFilterValue = options.defaultFilterValue;
    }
    CollectionView.__super__.constructor.apply(this, arguments);
    onScreenResize = this.onScreenResize;
    this.onScreenResize = _.debounce((function(_this) {
      return function() {
        return onScreenResize.apply(_this, arguments);
      };
    })(this), 100);
    $(window).on("resize.onScreenResize_" + this.cid, this.onScreenResize);
    $(window).on("orientationchange.onScreenResize_" + this.cid, this.onScreenResize);
  }

  CollectionView.prototype.initialize = function() {
    CollectionView.__super__.initialize.apply(this, arguments);
    return this.loadLastParams();
  };

  CollectionView.prototype.loadLastParams = function() {
    var id_, listViewID, _base, _ref, _ref1;
    id_ = (_ref = this.collection) != null ? (_ref1 = _ref.tableParent) != null ? _ref1.id : void 0 : void 0;
    listViewID = "" + this.className + "_" + id_;
    this.currentParams = {};
    (_base = this.currentParams).filterAttr || (_base.filterAttr = this.defaultFilterAttr || 'name');
    if ((this.defaultFilterValue != null) && (this.currentParams.filterValue == null)) {
      this.currentParams.filterValue = this.defaultFilterValue;
    }
    return this.orderByAttr(this.currentParams.filterAttr, this.currentParams.filterValue);
  };

  CollectionView.prototype.render = function() {
    this._rendered = false;
    CollectionView.__super__.render.apply(this, arguments);
    this.adjustSearchField(this.currentParams.filterAttr, this.currentParams.filterValue);
    this._rendered = true;
    this.trigger('rendered');
    return this;
  };

  CollectionView.prototype.attach = function() {
    CollectionView.__super__.attach.apply(this, arguments);
    this.adjustListHeight();
    return this.adjustScrollPosition();
  };

  CollectionView.prototype.onScreenResize = function() {
    return this.adjustListHeight();
  };

  CollectionView.prototype.adjustListHeight = function() {
    var adjust_;
    adjust_ = (function(_this) {
      return function(containerIsModal) {
        var calcHeight_;
        if (containerIsModal == null) {
          containerIsModal = false;
        }
        calcHeight_ = $(window).height() - _this.$(_this.listSelector).offset().top - 20;
        if (calcHeight_ < 250) {
          calcHeight_ = 250;
        }
        if (containerIsModal) {
          calcHeight_ = calcHeight_ - 20;
        }
        return _this.$(_this.listSelector).height(calcHeight_);
      };
    })(this);
    if (this.$('.modal').length > 0) {
      if ($('.modal').attr('aria-hidden') === "false") {
        return adjust_(true);
      } else {
        return this.$('.modal').on('shown.bs.modal', (function(_this) {
          return function() {
            return adjust_(true);
          };
        })(this));
      }
    } else {
      return adjust_();
    }
  };

  CollectionView.prototype.adjustScrollPosition = function() {
    if (this.currentParams.scrollTop != null) {
      return this.$(this.listSelector).scrollTop(this.currentParams.scrollTop);
    }
  };

  CollectionView.prototype.adjustSearchField = function(fieldName, value) {
    if (this.searchFieldSelector != null) {
      return this.whenRendered().then((function(_this) {
        return function() {
          _this.$(_this.searchFieldSelector).val(value);
          return _this.$(_this.searchFieldSelector).attr('placeholder', Utils.i18n_('c', 'search_by_term', {
            term: Utils.i18n_('t', fieldName)
          }));
        };
      })(this));
    }
  };

  CollectionView.prototype.filterList = function(event, value) {
    if (this.searchFieldSelector != null) {
      if (value != null) {
        this.$(this.searchFieldSelector).val(value);
      } else {
        value = this.$(this.searchFieldSelector).val();
      }
    }
    if (value != null) {
      this.filter((function(_this) {
        return function(model) {
          return _this.filterFN(model, value);
        };
      })(this));
    }
    return this.currentParams.filterValue = value;
  };

  CollectionView.prototype.filterFN = function(model, value) {
    var value_;
    value_ = model.get(this.currentParams.filterAttr);
    if (value_ != null) {
      return value_.toLowerCase().indexOf(value.toLowerCase()) > -1;
    } else {
      return false;
    }
  };

  CollectionView.prototype.orderByAttr = function(attrName, filterValue) {
    if (filterValue == null) {
      filterValue = '';
    }
    return this.whenRendered().then((function(_this) {
      return function() {
        var comparatorAttr_;
        _this.currentParams.filterAttr = attrName;
        _this.currentParams.filterValue = filterValue;
        comparatorAttr_ = _this.currentParams.filterAttr;
        if (comparatorAttr_ === 'alias') {
          comparatorAttr_ = 'aliasIntValue';
        }
        _this.collection.comparator = function(model) {
          var value;
          value = model.get(comparatorAttr_);
          return value;
        };
        _this.adjustSearchField(_this.currentParams.filterAttr, _this.currentParams.filterValue);
        _this.filterList(null, filterValue);
        return _this.collection.sort();
      };
    })(this));
  };

  CollectionView.prototype.saveScrollInfo = function() {
    return this.currentParams.scrollTop = this.$(this.listSelector).scrollTop();
  };

  CollectionView.prototype.filterCallback = function(view, included) {
    if ($) {
      view.$el.stop(true, true);
    }
    view.el.style.display = 'block';
    return toggleElement(($ ? view.$el : view.el), included);
  };

  CollectionView.prototype.initItemView = function(model) {
    if (this.itemView) {
      return new this.itemView({
        autoRender: false,
        model: model,
        saveScrollPosition: this.saveScrollInfo
      });
    } else {
      throw new Error('The CollectionView#itemView property ' + 'must be defined or the initItemView() must be overridden.');
    }
  };

  CollectionView.prototype.reattach = function() {
    var subview, _i, _len, _ref;
    this.attach();
    this.delegateEvents();
    _ref = this.subviews;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      subview = _ref[_i];
      subview.reattach();
    }
    return this;
  };

  CollectionView.prototype.whenRendered = function() {
    var deferred;
    deferred = Q.defer();
    if (this._rendered) {
      deferred.resolve();
    } else {
      this.listenToOnce(this, 'rendered', function() {
        return deferred.resolve();
      });
    }
    return deferred.promise;
  };

  CollectionView.prototype.dispose = function() {
    var prop, properties, _i, _len;
    if (this.disposed) {
      return;
    }
    $(window).off(".onScreenResize_" + this.cid);
    properties = ['currentParams'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];
      delete this[prop];
    }
    return CollectionView.__super__.dispose.apply(this, arguments);
  };

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view-helper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  View.prototype.optionNames = Chaplin.View.prototype.optionNames.concat(['template']);

  View.prototype._rendered = false;

  View.prototype.renderAnimation = 'fadeIn';

  function View(options) {
    if (options == null) {
      options = {};
    }
    if (this.renderAnimation != null) {
      if (options.className != null) {
        options.className = options.className + (" animated " + this.renderAnimation);
      } else {
        this.className = this.className + (" animated " + this.renderAnimation);
      }
    }
    View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  View.prototype.render = function() {
    this._rendered = false;
    View.__super__.render.apply(this, arguments);
    this._rendered = true;
    this.trigger('rendered');
    return this;
  };

  View.prototype.reattach = function() {
    var subview, _i, _len, _ref;
    this.attach();
    this.delegateEvents();
    _ref = this.subviews;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      subview = _ref[_i];
      subview.reattach();
    }
    return this;
  };

  View.prototype.attach = function() {
    View.__super__.attach.apply(this, arguments);
    if (this.model != null) {
      if (typeof this.stickit === 'function') {
        return this.stickit();
      }
    }
  };

  View.prototype.whenRendered = function() {
    var deferred;
    deferred = Q.defer();
    if (this._rendered) {
      deferred.resolve();
    } else {
      this.listenToOnce(this, 'rendered', function() {
        return deferred.resolve();
      });
    }
    return deferred.promise;
  };

  View.prototype.dispose = function() {
    var prop, properties, _i, _len;
    if (this.model != null) {
      if (typeof this.stickit === 'function') {
        this.unstickit();
      }
    }
    properties = ['currentParams'];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];
      delete this[prop];
    }
    return View.__super__.dispose.apply(this, arguments);
  };

  return View;

})(Chaplin.View);
});

;require.register("views/home/header-view", function(exports, require, module) {
var HeaderView, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = HeaderView = (function(_super) {
  __extends(HeaderView, _super);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.container = '#header-container';

  HeaderView.prototype.containerMethod = 'html';

  HeaderView.prototype.template = require('./templates/header');

  return HeaderView;

})(View);
});

;require.register("views/home/templates/header", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "toggle_navigation", options) : helperMissing.call(depth0, "i18n_", "c", "toggle_navigation", options)))
    + "</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\"><img src=\"images/logo.png\" alt=\"logo\"/><span class=\"app-title\"><strong>Web&nbsp;</strong>Scanner</span></a></div><div id=\"navbar\" class=\"navbar-collapse collapse\"></div></div>";
  return buffer;
  });
});

require.register("views/scan/scan-view", function(exports, require, module) {
var ScanView, Scanner, Utils, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Utils = require('lib/utils');

Scanner = require('lib/scanner');

module.exports = ScanView = (function(_super) {
  __extends(ScanView, _super);

  function ScanView() {
    this.saveImage = __bind(this.saveImage, this);
    this.showPreview = __bind(this.showPreview, this);
    return ScanView.__super__.constructor.apply(this, arguments);
  }

  ScanView.prototype.autoRender = true;

  ScanView.prototype.className = 'scan-page';

  ScanView.prototype.template = require('./templates/scan-page');

  ScanView.prototype.events = {
    'click #previewButton': 'preview',
    'click #scanButton': 'scan'
  };

  ScanView.prototype.render = function() {
    return ScanView.__super__.render.apply(this, arguments);
  };

  ScanView.prototype.preview = function() {
    return Scanner.preview().then((function(_this) {
      return function(previewImage) {
        return _this.showPreview(previewImage);
      };
    })(this));
  };

  ScanView.prototype.scan = function() {
    var options;
    options = {};
    options.fileName = this.$('input#filename').val();
    return Scanner.scan(options).then((function(_this) {
      return function() {
        return _this.publishEvent("!application:showAlert", {
          type: 'information',
          text: 'Image scanned successfully!'
        });
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        console.error(err);
        return _this.publishEvent("!application:showAlert", {
          type: 'error',
          text: err
        });
      };
    })(this));
  };

  ScanView.prototype.showPreview = function(scannedImageRes) {
    return this.$('img.scanned-img').attr('src', scannedImageRes);
  };

  ScanView.prototype.saveImage = function(scannedImage) {
    return window.location.assign(scannedImage);
  };

  return ScanView;

})(View);
});

;require.register("views/scan/templates/scan-page", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row scan-actions\"><div class=\"col-md-8 col-md-offset-2\"><div class=\"row\"><div class=\"col-md-8\"><div class=\"form-horizontal\"><div class=\"form-group\"><label for=\"baseRepoPath\" class=\"col-sm-4 control-label\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "file_name", options) : helperMissing.call(depth0, "i18n_", "c", "file_name", options)))
    + "</label><div class=\"col-sm-8\"><input id=\"filename\" type=\"text\" placeholder=\"file name for save\" value=\"filename.jpg\" class=\"form-control\"/></div></div></div></div><div class=\"col-md-4\"><button id=\"scanButton\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "scan_and_save", options) : helperMissing.call(depth0, "i18n_", "c", "scan_and_save", options)))
    + "</button><button id=\"previewButton\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "preview", options) : helperMissing.call(depth0, "i18n_", "c", "preview", options)))
    + "</button></div></div></div></div><div class=\"row\"><div class=\"col-md-8 col-md-offset-2\"><div class=\"panel panel-default\"><div class=\"panel-heading text-center\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "image_preview", options) : helperMissing.call(depth0, "i18n_", "c", "image_preview", options)))
    + "</div><div class=\"panel-body\"><img class=\"scanned-img\"/></div></div></div></div>";
  return buffer;
  });
});

require.register("views/setup/setup-view", function(exports, require, module) {
var SetupView, Utils, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Utils = require('lib/utils');

module.exports = SetupView = (function(_super) {
  __extends(SetupView, _super);

  function SetupView() {
    return SetupView.__super__.constructor.apply(this, arguments);
  }

  SetupView.prototype.autoRender = true;

  SetupView.prototype.className = 'setup-page';

  SetupView.prototype.template = require('./templates/setup');

  SetupView.prototype.bindings = {
    '#baseRepoPath': 'base_repo_path'
  };

  SetupView.prototype.events = {
    'click #saveButton': "saveSetup"
  };

  SetupView.prototype.saveSetup = function() {
    var opts;
    opts = {
      success: (function(_this) {
        return function() {
          console.log("save setup success!");
          return Chaplin.utils.redirectTo({
            url: '/'
          });
        };
      })(this),
      error: (function(_this) {
        return function(model, response) {
          return _this.publishEvent("!application:showAlert", {
            type: 'error',
            text: Utils.i18n_('c', 'setup:invalid_setup_msg')
          });
        };
      })(this)
    };
    return this.model.save(null, opts);
  };

  return SetupView;

})(View);
});

;require.register("views/setup/templates/setup", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"page-title\"><h4>"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "setup:editor_setup", options) : helperMissing.call(depth0, "i18n_", "c", "setup:editor_setup", options)))
    + "</h4></div><div class=\"row\"><div class=\"col-md-8 col-md-offset-2\"><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"form-horizontal\"><div class=\"form-group\"><label for=\"baseRepoPath\" class=\"col-sm-4 control-label\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "setup:base_files_repo_path", options) : helperMissing.call(depth0, "i18n_", "c", "setup:base_files_repo_path", options)))
    + "</label><div class=\"col-sm-8\"><input id=\"baseRepoPath\" type=\"text\" placeholder=\"path\" value=\"";
  if (helper = helpers.base_repo_path) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.base_repo_path); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-attr=\"base_repo_path\" class=\"form-control\"/></div></div></div></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><div class=\"pull-right\"><button id=\"saveButton\" type=\"button\" class=\"btn btn-primary\">"
    + escapeExpression((helper = helpers.i18n_ || (depth0 && depth0.i18n_),options={hash:{},data:data},helper ? helper.call(depth0, "c", "save", options) : helperMissing.call(depth0, "i18n_", "c", "save", options)))
    + "</button></div></div></div></div></div></div></div>";
  return buffer;
  });
});

require.register("views/site-view", function(exports, require, module) {
var SiteView, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = SiteView = (function(_super) {
  __extends(SiteView, _super);

  function SiteView() {
    return SiteView.__super__.constructor.apply(this, arguments);
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.regions = {
    header: '#header-container',
    main: '#page-container',
    alerts: '.alert-container'
  };

  SiteView.prototype.template = require('./templates/site');

  return SiteView;

})(View);
});

;require.register("views/templates/alert", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div role=\"alert\" class=\"alert alert-dismissible alert-";
  if (helper = helpers.level) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.level); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><button type=\"button\" data-dismiss=\"alert\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><strong>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong> ";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });
});

require.register("views/templates/backbutton", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<a href="javascript:window.history.back()" class="text-left">{{i18n_ \'c\' \'back\'}}</a>');
}
return buf.join("");
};
});

require.register("views/templates/site", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header id=\"header-container\" class=\"navbar navbar-inverse navbar-fixed-top\"></header><div class=\"container\"><div id=\"page-container\"></div></div>";
  });
});


//# sourceMappingURL=app.js.map