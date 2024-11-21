import os
import ctypes

# # Đường dẫn chính xác đến file DLL
# dll_path = "C:\\Users\\TRAN VAN TRI\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python310\\site-packages\\torch\\lib\\fbgemm.dll"

# if os.path.exists(dll_path):
#     ctypes.windll.LoadLibrary(dll_path)
# else:
#     print("DLL path not found:", dll_path)


# dll_path = "C:/Users/TRAN VAN TRI/AppData/Local/Packages/PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0/LocalCache/local-packages/Python310/site-packages/torch/lib/fbgemm.dll"

# if os.path.exists(dll_path):
#     ctypes.windll.LoadLibrary(dll_path)
# else:
#     print("DLL path not found:", dll_path)

dll_path = r"C:\Users\TRAN VAN TRI\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\LocalCache\local-packages\Python310\site-packages\torch\lib\fbgemm.dll"

if os.path.exists(dll_path):
    ctypes.windll.LoadLibrary(dll_path)
else:
    print("DLL path not found:", dll_path)
