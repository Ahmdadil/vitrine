                                                              Next Tech APP
                                                  Created by Ahammed Adil P on 14/08/2023
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Initial steps:
	*deleted unwanted files after installing react + vite app.
	*Install: 
		a) Tailwind css : - install from https://tailwindcss.com/docs/installation
                          - Opted Javascript version. using CLI
                          - create a 'jsonconfig.json' file in app(main) folder.
                          - To configure import aliases, you can use the following jsconfig.json:

                        {
                            "compilerOptions": 
                            {
                            "paths": {
                                     "@/*": ["./*"]
                                     }
                            }
                        }

                          - proceed with cli steps : https://ui.shadcn.com/docs/cli
                       
        b) React route :  - follow steps in https://reactrouter.com/en/main/start/tutorial
                          - used version 6.4
                          - 
		 

















--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


