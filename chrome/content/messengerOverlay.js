UseBccInstead.UseBccInsteadMessengerOverlay =
{
  missingMainToolbarButton: false,
  ourLabel: null,

  setOurLabelValue: function(whatToDo)
  {
    UseBccInstead.UseBccInsteadMessengerOverlay.ourLabel.value = whatToDo;
  },

  onToolboxCustomizeStart: function(event)
  {
    if(event.target == document.getElementById("mail-toolbox"))
    {
      // if our button is missing in its toolbox, note that this was the case
      // at the beginning of the customization
      if(null == document.getElementById("UseBccInsteadMainViewToolbarButton"))
      {
        UseBccInstead.UseBccInsteadMessengerOverlay.missingMainToolbarButton = true;
      }
      else
      {
        UseBccInstead.UseBccInsteadMessengerOverlay.missingMainToolbarButton = false;
      }
    }
  },

  onToolboxCustomizeEnd: function(event)
  {
    if(event.target == document.getElementById("mail-toolbox"))
    {
      if(null != document.getElementById("UseBccInsteadMainViewToolbarButton"))
      {
        if(UseBccInstead.UseBccInsteadMessengerOverlay.missingMainToolbarButton == true)
        {
          UseBccInstead.UseBccInsteadMessengerOverlay.readyMainToolbarButton();
          UseBccInstead.UseBccInsteadMessengerOverlay.missingToolbarButton = false;
        }
        else
        {
          UseBccInstead.UseBccInsteadMessengerOverlay.missingMainToolbarButton = false;
        }
      }
    }
  },

  doWrite: function(whatToDo)
  {
     UseBccInstead.UseBccInsteadMessengerOverlay.setOurLabelValue(whatToDo);
     MsgNewMessage(null);
  },

  doReply: function(whatToDo)
  {
     UseBccInstead.UseBccInsteadMessengerOverlay.setOurLabelValue(whatToDo);
     MsgReplyMessage(null);
  },

  doReplyAll: function(whatToDo)
  {
     UseBccInstead.UseBccInsteadMessengerOverlay.setOurLabelValue(whatToDo);
     MsgReplyToAllMessage(null);
  },

  doForward: function(whatToDo)
  {
     UseBccInstead.UseBccInsteadMessengerOverlay.setOurLabelValue(whatToDo);
     MsgForwardMessage(null);
  },

  configureMenuVisibility: function(menuIdArray)
  {
    var toBeHidden = false;

    if(document.getElementById("mailContent")) // main TB window
    {
      var selectedMessageCount = (UseBccInstead.UseBccInsteadUtil.isTB2()) ? GetNumSelectedMessages() : gFolderDisplay.selectedCount;
      if(selectedMessageCount != 1)
      {
        toBeHidden = true;
      }
      else
      {
        toBeHidden = false;
      }
    }
    else
    {
      // message opened in its own window
        toBeHidden = false;
    }

    for(var i = 0; i < menuIdArray.length; i++)
    {
      var menu = document.getElementById(menuIdArray[i]);
      menu.hidden = toBeHidden;
    }
  },

  onMainToolbarButtonMenuPopup: function()
  {
    var menuIdArray = ["UseBccInsteadReplyMenu", "UseBccInsteadReplyAllMenu", "UseBccInsteadForwardMenu"];
    UseBccInstead.UseBccInsteadMessengerOverlay.configureMenuVisibility(menuIdArray);
  },

  onMessageMenuPopup: function()
  {
    var menuIdArray = ["UseBccInsteadMainMenuReplyMenu", "UseBccInsteadMainMenuReplyAllMenu", "UseBccInsteadMainMenuForwardMenu"];
    UseBccInstead.UseBccInsteadMessengerOverlay.configureMenuVisibility(menuIdArray);
  },

  onMessageContextMenuPopup: function()
  {
    var menuIdArray = ["UseBccInsteadMessageContextMenuReplyMenu", "UseBccInsteadMessageContextMenuReplyAllMenu", "UseBccInsteadMessageContextMenuForwardMenu"];
    UseBccInstead.UseBccInsteadMessengerOverlay.configureMenuVisibility(menuIdArray);
  },

  onThreadContextMenuPopup: function()
  {
    var menuIdArray = ["UseBccInsteadThreadContextMenuReplyMenu", "UseBccInsteadThreadContextMenuReplyAllMenu", "UseBccInsteadThreadContextMenuForwardMenu"];
    UseBccInstead.UseBccInsteadMessengerOverlay.configureMenuVisibility(menuIdArray);
  },

  readyMessageMenu: function()
  {
    var widget = document.getElementById("UseBccInsteadMainMenuReaddressMenu");

    // the mneu may not be shown on the window
    if(widget)
    {
      widget.addEventListener("popupshowing", UseBccInstead.UseBccInsteadMessengerOverlay.onMessageMenuPopup, false);

      var enabled = UseBccInstead.UseBccInsteadUtil.getBoolPref("extensions.usebccinstead.enableChangeAll", true);

      if(!enabled)
      {
        widget.setAttribute("hidden", true);
      }
      else
      {
        widget.setAttribute("hidden", false);
      }
    }
  },

  readyThreadContextMenu: function()
  {
    // there is only one context menu on TB 3.x and above
    if(!UseBccInstead.UseBccInsteadUtil.isTB2())
    {
      return;
    }

    var widget = document.getElementById("UseBccInsteadThreadContextMenuReaddressMenu");

    // the mneu may not be shown on the window
    if(widget)
    {
      widget.addEventListener("popupshowing", UseBccInstead.UseBccInsteadMessengerOverlay.onThreadContextMenuPopup, false);

      var enabled = UseBccInstead.UseBccInsteadUtil.getBoolPref("extensions.usebccinstead.enableChangeAll", true);

      if(!enabled)
      {
        widget.setAttribute("hidden", true);
      }
      else
      {
        widget.setAttribute("hidden", false);
      }
    }
  },

  readyMainToolbarButton: function()
  {
    var widget = document.getElementById("UseBccInsteadMainViewToolbarButton");

    // the button may not be shown on the window
    if(widget)
    {
      widget.addEventListener("popupshowing", UseBccInstead.UseBccInsteadMessengerOverlay.onMainToolbarButtonMenuPopup, false);

      var enabled = UseBccInstead.UseBccInsteadUtil.getBoolPref("extensions.usebccinstead.enableChangeAll", true);

      if(!enabled)
      {
        widget.setAttribute("disabled", true);
      }
      else
      {
        widget.setAttribute("disabled", false);
      }
    }
  },

  readyHeaderToolbarButton: function()
  {
    var widget = document.getElementById("UseBccInsteadHeaderViewToolbarButton");

    // the button may not be shown on the window
    if(widget)
    {
      var enabled = UseBccInstead.UseBccInsteadUtil.getBoolPref("extensions.usebccinstead.enableChangeAll", true);

      if(!enabled)
      {
        widget.setAttribute("disabled", true);
      }
      else
      {
        widget.setAttribute("disabled", false);
      }
    }
  },

  readyMessageContextMenu: function()
  {
    var widget = document.getElementById("UseBccInsteadMessageContextMenuReaddressMenu");

    // the button may not be shown on the window
    if(widget)
    {
      widget.addEventListener("popupshowing", UseBccInstead.UseBccInsteadMessengerOverlay.onMessageContextMenuPopup, false);

      var enabled = UseBccInstead.UseBccInsteadUtil.getBoolPref("extensions.usebccinstead.enableChangeAll", true);

      if(!enabled)
      {
        widget.setAttribute("hidden", true);
      }
      else
      {
        widget.setAttribute("hidden", false);
      }
    }
  },

  onLoad: function()
  {
    // remove to avoid duplicate initialization
    window.removeEventListener("load", UseBccInstead.UseBccInsteadMessengerOverlay.onLoad, true);

    // only works on TB 3.3 +
    window.addEventListener("beforecustomization", UseBccInstead.UseBccInsteadMessengerOverlay.onToolboxCustomizeStart, false);
    window.addEventListener("aftercustomization", UseBccInstead.UseBccInsteadMessengerOverlay.onToolboxCustomizeEnd, false);

    // initialize our label - this really should not be needed as it is done below
    UseBccInstead.UseBccInsteadMessengerOverlay.ourLabel = document.getElementById("UseBccInsteadWhatToDo");

    UseBccInstead.UseBccInsteadMessengerOverlay.readyMainToolbarButton();
    UseBccInstead.UseBccInsteadMessengerOverlay.readyHeaderToolbarButton();
    UseBccInstead.UseBccInsteadMessengerOverlay.readyMessageMenu();
    UseBccInstead.UseBccInsteadMessengerOverlay.readyMessageContextMenu();
    UseBccInstead.UseBccInsteadMessengerOverlay.readyThreadContextMenu();
  }
}

function UseBccInsteadOnCustomizeClose()
{
  UseBccInstead.UseBccInsteadMessengerOverlay.readyMainToolbarButton();
}

window.addEventListener("load", UseBccInstead.UseBccInsteadMessengerOverlay.onLoad, true);
