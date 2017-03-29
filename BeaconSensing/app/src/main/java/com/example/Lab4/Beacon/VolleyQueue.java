package com.example.Lab4.Beacon;

import android.content.Context;

import com.android.volley.Cache;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Network;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.DiskBasedCache;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;




public class VolleyQueue {


    RequestQueue mRequestQueue;
    String url;

    public VolleyQueue(Context m) {
        url ="http://192.168.2.14:8090/users";
        // Instantiate the cache
        Cache cache = new DiskBasedCache(m.getCacheDir(), 1024 * 1024); // 1MB cap
        // Set up the network to use HttpURLConnection as the HTTP client.
        Network network = new BasicNetwork(new HurlStack());
        // Instantiate the RequestQueue with the cache and network.
        mRequestQueue = new RequestQueue(cache, network);
        // Start the queue
        mRequestQueue.start();

    }

    public void addMessage(final String... param) {


        // Formulate the request and handle the response.
        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                      
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        
                    }
                }
                ) {
            @Override
            protected Map<String, String> getParams()
            {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("reqCode", param[0]);

                return params;
            }
        };
        stringRequest.setRetryPolicy(new DefaultRetryPolicy());
   
        mRequestQueue.add(stringRequest);
    }

}
