package strobs.utoo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class cFrontcontroller
{
	private ResourceBundle rsbAR = ResourceBundle.getBundle("ApplicationResource");
	 Utilities utilities =new Utilities();
	 private String _DEFALUT_PAGE_NAME="login"; 
	@RequestMapping("/")  
	public String index(HttpSession session) 
	{  
		session.setAttribute("islogin","0");
		return "login";  
	}
	@RequestMapping("/logout_main")  
	public String logout_main(HttpSession session) 
	{  
		session.setAttribute("islogin","0"); 
		return "login";  
	}
	
	@RequestMapping("/utoodashboard")  
	public String utoodashboard(HttpSession session) 
	{   
	  return IsExpiredLoginCountry(session,"utoodashboard");
		
	}
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody
	Map<String, Object> userlogin(HttpSession session,
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String json) {
		String userlogin_Path = rsbAR.getString("login");
		Map<String,Object>login_response=new HashMap<String,Object>();
		login_response=utilities.ResponseData(json, userlogin_Path, "POST","");
		int loginresponse=cFrontcontroller.toInteger(login_response);
		if(loginresponse==1)
			session.setAttribute("islogin","1"); 
	else
			session.setAttribute("islogin","0");
		return login_response;
	}
	@RequestMapping(value = "/verifyotp", method = RequestMethod.POST)
	public @ResponseBody
	Map<String, Object> verifyotp(HttpSession session,
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String json) {
		String userlogin_Path = rsbAR.getString("verifyotp");
		return utilities.ResponseData(json, userlogin_Path, "POST","");

	}
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public @ResponseBody
	Map<String, Object> logout(HttpSession session,
			HttpServletRequest request, HttpServletResponse response,
			@RequestBody String json) {
		String userlogin_Path = rsbAR.getString("logout");
		return utilities.ResponseData(json, userlogin_Path, "POST","");

	}
	public static int toInteger(Map<String,Object> loginresponse){
		if(loginresponse==null)
		return 0;
		int loginresponseint=Integer.parseInt(loginresponse.get("status").toString());
			return loginresponseint;
	}
	private String IsExpiredLoginCountry(HttpSession session,String PageName)
    {
      Object locsession=session.getAttribute("islogin");
      session.setMaxInactiveInterval(14400);
        if(locsession==null)
            return _DEFALUT_PAGE_NAME;
        if(locsession.equals("1"))
            return PageName;
        return _DEFALUT_PAGE_NAME;
    }
	
	/* Common Functions End */
}
