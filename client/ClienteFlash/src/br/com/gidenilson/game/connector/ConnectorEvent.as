package br.com.gidenilson.game.connector
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Gidenilson A. Santiago
	 */
	public class ConnectorEvent extends Event 
	{
		public static const RECEIVE:String = "receive";
		public static const CONNECT_ERROR:String = "connect_error";
		public static const CLOSE:String = "close";
		public static const CONNECTED:String = "connected";
		public var data:String;
		
		public function ConnectorEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			
		} 
		
		public override function clone():Event 
		{ 
			return new ConnectorEvent(type, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("ConnectorEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}